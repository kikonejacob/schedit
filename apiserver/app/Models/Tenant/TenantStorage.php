<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/26/16
 * Time: 10:09 PM
 *
 * This is the only model that support file storage and manipulation in school exit.
 * Others models can use this models to interact with files stored in tenant virtual disk
 */

namespace App\Models\Tenant;


use App\Lib\Tenant\TenantAuth;
use App\TenantManager\Tenant;
use App\User;
use Config;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Image;
use Storage;
use League\Flysystem\File;

class TenantStorage extends Model
{
    const USER_PROFILE_PICTURES = 'user.profile.pictures';
    const USER_PROFILE_DOCS = 'user.profile.docs';
    const USER_PROFILE_PUBLIC = 'user.profile.public';
    const USER_PROFILE_REPORTS = 'user.profile.reports';
    const FILE_TEMPORARY = 'file.temporary';
    const SCHOOL_PROFILE_PICTURE = 'school.profile.picture';
    const SCHOOL_PUBLIC = 'school.public';
    const SCHOOL_USERS='school.public';

    // File context control where to store the file  and who can access to it
    // User directories should start with $user
    // School directories should start with /
    const FILE_CONTEXT_LIST = array(
        self::USER_PROFILE_REPORTS          => array('path' => '$user/profile/reports/' , 'access' => ['admin' , '$owner']) ,
        self::USER_PROFILE_DOCS             => array('path' => '$user/profile/docs/' , 'access' => ['admin' , '$owner']) ,
        self::USER_PROFILE_PICTURES         => array('path' => '$user/profile/picture/' , 'access' => ['admin' , '$owner']) ,
        self::USER_PROFILE_PUBLIC           => array('path' => '$user/profile/public/' , 'access' => 'any') ,
        self::SCHOOL_PUBLIC                 => array('path' => '/profile/public/' , 'access' => 'any') ,
        self::SCHOOL_PROFILE_PICTURE        => array('path' => '/profile/public/pictures/' , 'access' => 'any') ,
        self::SCHOOL_USERS                  => array('path' => '/users/' , 'access' => 'admin,$owner') ,
        self::FILE_TEMPORARY                => array('path' => '/temp/' , 'access' => 'none')
    );
    protected  static $storageDisk=null;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'sch_storage';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['created_at' , 'updated_at'];
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';


    private function normalizeContext($element){
        if (is_string($element)){
            return str_replace('$owner',$element,$this->owner()->id);
        }
        else
            if (is_array($element))  {
                return str_replace_array('$owner',$element,$this->owner()->id);
            }
            else
                return $element;
    }
    private  function normalizeContextAccessRules($rules){
        return $this->normalizeContext($rules);
    }
    /**
     * @param string $context
     * @param User $user
     * @return bool
     * @throws \Exception
     */
    public function canAccess($context,$user){
        $contextInfo=self::FILE_CONTEXT_LIST[$context];
        if (!isset($contextInfo)) {
            throw  new \Exception("context not found");
        }
        if (!isset($contextInfo->access)){
            return true;
        }
        $accessConditions=$this->normalizeContextAccessRules(array_get($contextInfo,'access'));
        if ($accessConditions=='any')  {
            return true;
        }
        else
            if (!($user->hasRole($accessConditions))){
                return false;
            }
            else
                return false;
    }
    public function makeCache(){

    }

    public function createPictureMiniatures(){
        $miniaturesPixels=[
            '320x400'=>array(320,400),
            '160x200'=>array(320,400),internal_name
        ];
        foreach ($miniaturesPixels as $pixels){
            return $this->createPictureMiniature($pixels[0],$pixels[1]);
        }
    }
    /** Miniaturize a  picture */
    public function createPictureMiniature($width,$height){
        if ($this->is_original==false) {
            throw new exception('Only Original picture can get miniatures');
        }
        /** @var Image $img */
        $img = Image::make($this->getFile());
        $img->resize($width, $height);
        $newFilePath=self::resolveContextPath($this->context).$this->internal_name.$width.'x'.$height;
        $values=$this->attributes;
        $values['is_original_file']=false;
        TenantStorage::insert($value);
        self::storage()->put($newFilePath,$img->encode());
    }

    /** Actually the context is the folder
     * @param $internal_name
     * @param $context
     * @throws \Exception
     * @internal param $fileId
     */
    // The $config is supposed to  contains data about
  public static  function moveTemporaryFileToContext($internal_name, $context)
    {
        /** @var TenantStorage $result */
        $result = self::
                    where('internal_name',$internal_name)
                    ->andWhere('is_original_file',true);
        if ($result->context == self::FILE_TEMPORARY) {
            $location = $result->getFilePath();
            // check that the current user can access to this context
            if ($result->canAccess($context,TenantAuth::user())) {
                $newPath=self::resolveContextPath($context).$internal_name;
                Storage::disk('tenant')->move($location ,$newPath );
            } else
                throw  new \Exception("The current user don't have access to this context");

        }
        throw new \Exception('initial context is not valid');

    }

    /**
     * Return the file from the storage model
     * @return string
     */
    public function getFile()
    {
        return self::storage()->get($this->getFilePath());
    }

    /**
     * Get the file location path  in the tenant disk
     * @return string
     */
    public function getFilePath()
    {
        return $this->resolveContextPath($this->context).$this->internal_name;

    }

    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Create Context Folders For User
     * @param $userId
     */
    public static function  createContextFolderForUser($userId)
    {
        $contexts=array_pluck(self::FILE_CONTEXT_LIST,['path']);
        $contexts=preg_grep('^\$user\/',$$contexts); // Match user directories
        foreach ( $contexts as $context){
            $path=str_replace('$user','users/w'.$userId,$context);
            self::storage()->makeDirectory($path);
        }
    }

    /**
     *  Create context folders for user
     * @param array $config
     */
    public static  function  createContextFolder($config)
    {
        $contexts=array_pluck(self::FILE_CONTEXT_LIST,['path']);
        $contexts=preg_grep('/^\//',$contexts);  // Match directories with
        foreach ( $contexts as $context){
              self::getStorage($config)->makeDirectory($context); // We are the config file to set storage
        }

    }

    /**  Initialize the storage for  a newly created tenant
     * @param String $path
     * @param array $config
     */
    public  static function initializeTenantConfigFile($path,$config){
        $content=json_encode($config);
        Storage::disk('tenants')->put($path.'/config.env',$content);
    }

    /**
     * return the context directory path
     * @param string $context
     * @return string
     * @throws Exception
     */
    public static function resolveContextPath($context){
        $path=self::FILE_CONTEXT_LIST[$context]['path'];
        if (!isset($path)){
            throw new Exception('file context does not exist');
        }
        $variables=[
            '$user'=>'w'.TenantAuth::user()->id,
            '$school' =>'/'
        ];
        foreach ($variables as $variable=>$value){
            $path=str_replace($variable,$value,$path);
        }
        return $path;
    }


    /**
     * Return the storage for the tenant
     * @param $storageInfo
     * @return \Illuminate\Filesystem\FilesystemAdapter
     */
    private static function getStorage($storageInfo){
        if (self::$storageDisk===null){
            switch ($storageInfo['storage_type']) {
                case'local':
                    Config::set('filesystems.disks.tenant.root',storage_path('app/tenants/'.$storageInfo['internal_name']));
                    break;
                case 'dropbox':
                    /** @todo Add virtual for dropbox */
                    break;
                default:
                    Config::set('filesystems.disks.tenant.root',storage_path('app/tenants/'.$storageInfo['internal_name']));
                    break;

            }
            self::$storageDisk=Storage::disk('tenant');
        }


        return self::$storageDisk;
    }

    public  static function storage(){
        return self::getStorage(array(
            'storage_type'  => Config::get('sch.tenant.storage_type'),
            'storage_credential'    => Config::get('sch.tenant.storage_credential'),
            'internal_name' => Config::get('sch.tenant.internal_name'),
        ));
    }

    /**
     * Store the file according the context
     * Override of creator
     * @inheritdoc
     */
    public static  function create(array $attributes = []){
         $attributes['internal_name']=basename(self::storage()
            ->put(self::resolveContextPath($attributes['context']), $attributes['file'])
        );
       $attributes['is_original_file']='true';
        return parent::create(array_except($attributes,'file'));

    }

    /**
     * @inheritdoc
     */
    public function delete()
    {
        self::storage()->delete($this->getFilePath());
        $residues=TenantStorage::where('internal_name',$this->internal_name);
        foreach ($residues as $residue){
            $residue->delete();
        }
        return parent::delete(); // TODO: Change the autogenerated stub
    }


}