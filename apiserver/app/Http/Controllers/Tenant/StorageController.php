<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/26/16
 * Time: 2:55 PM
 */

namespace App\Http\Controllers\Tenant;

use App\Helpers;




use function App\Helpers\generateTicketCode;
use App\Models\Tenant\TenantStorage;
use App\TenantMgr\Tenant;use Illuminate\Http\Request;use Storage;

/**
 * Class StorageController
 * @package App\Http\Controllers\Tenant
 *
 * Storage Model:
 *          -> Fist user must upload a file using StoragController
 *          -> user get a ticket for it stored file
 *
 *          ->user can use this ticker to reference the file in different rest api request
 *           Example of usage:
 *           We want to store user profile:
 *
 *          First we have an ajax request with the file: POST[file]->api/storage
 *          We receive back the ticker numbe  RESTAPI RESPONSEr;
 *          send an ajax request to Api/student/{student}
 *                  the controller will create an image preview using http://image.intervention.io/
 *
 *
 *
 *
 */


// File context controll where to store the file  and who can access to it
$context = array(
    'user.student.profile.picture'      => ['path'=>'$user/profile/pictures' , 'access' => array('admin' , 'student:$user')] ,
    'user.student.profile.docs'         => ['$user/profile/docs' , 'access' => array('admin' , 'student:$user')] ,
    'user.student.profile.term-reports' => ['$user/profile/term-reports' , 'access' => array('admin' , 'student:$user')] ,
    'user.profile'                      => ['$user/profile/docs' , 'access' => array('admin' , 'student:$user')] ,
    'user.teacher.public'               => ['$user/profile/public' , 'access' => array('any')] ,
    'user.teach.courses.public'         => ['$user/profile/courses' , 'access' => array('any')] ,
    'school.profile.picture'            => ['$user/profile/pictures' , 'access' => 'any'] ,
    'file.temporary'                    => ['/temp' , 'access' => 'none']
);

class StorageController extends  Controller
{


    public function index($userId){

    }
    public function store(Request $request,$userId){

        $rule=array(
            'file'=>'required|file',
        );
        $values=$request->only(['file']);
        $uniqueId=generateTicketCode();
        $path="/temp".$uniqueId;
        Storage::disk('tenant')->put($path,$values['file']);
        $fileInfo=array(
            'location'=>$path,
            'owner'=>Tenant::currentUser(),
            'context'=>'file.temporary',
            'type'=>'@todo file type'
    );

        //@todo store time in user model so we can limit the upload frequences of a user
        return TenantStorage::create($fileInfo); //Should return a uniq ticket
    }

    public function show($studentId,$ticket){

    }

}