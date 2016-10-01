<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;


class EducSubject extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_subjects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','code','groupid'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'code';

    /**  Here the primary key is not auto incrementing
     * @var bool
     */
    public $incrementing = false;

  


}
