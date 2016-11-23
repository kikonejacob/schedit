<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/26/16
 * Time: 2:55 PM
 */

namespace App\Http\Controllers\Tenant;

use App\Lib\Tenant\TenantAuth;
use App\Models\Tenant\TenantStorage;
use App\Sch\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use League\Flysystem\File;
use Storage;

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
 *          We receive back the ticker number  RESTAPI RESPONSEr;
 *          send an ajax request to Api/student/{student}
 *                  the controller will create an image preview using http://image.intervention.io/
 *
 *
 *
 *
 */



class StorageController extends Controller
{

    /**
     * Return the file represented by the ticket
     * @param  string $ticket
     * @return  File
     */
    public function getFile($ticket)
    {
        $id=decrypt($ticket);
        /** @var TenantStorage $fileInformation */
        $fileInformation=TenantStorage::find($id);
        return $fileInformation->getFile();
    }

    public function store(Request $request)
    {
        $rules = array(
            'file' => 'required|file' ,
        );
        try {
            $this->validate($request , $rules);

            $values = $request->only(['file']);
            $uniqueId = FileHelper::generateTicketCode();
            $fileInfo = array(
                'internal_name' => $uniqueId ,
                'owner'    => TenantAuth::user() ,
                'context'  => TenantStorage::FILE_TEMPORARY,
                'type'     => '@todo file type',
                'file'     =>$values['file']
            );

            //@todo store time in user model so we can limit the upload frequences of a user
            return encrypt(TenantStorage::create($fileInfo)->id); //Should return a unique ticket
        }
        catch(ValidationException $error)  {
                return $this->APIValidationError($error);
        }

    }

    public function index($ticket)
    {

    }

}