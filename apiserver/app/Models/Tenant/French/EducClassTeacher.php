<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/29/16
 * Time: 4:24 PM
 */

namespace App\Models\Tenant;


use Illuminate\Database\Eloquent\Model;

class EducClassTeacher extends  Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_class_timeline';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','teacherId','classId','course_code'];

}