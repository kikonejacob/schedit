<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Zizaco\Entrust\Traits\EntrustUserTrait; //For Roles and permission with Entrust


use App\Models\Tenant\StudentInfo;
use App\schtraits\studentTrait;

class User extends Model implements AuthenticatableContract , CanResetPasswordContract
{
    use Authenticatable , CanResetPassword;
    use studentTrait;
    use EntrustUserTrait; //For Roles and permission with Entrush
    use Notifiable;
    use HasApiTokens;


    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */


    protected $guarded = ['id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password' , 'remember_token' , 'role' , 'deleted_at' , 'created_at' , 'updated_at'];


}
