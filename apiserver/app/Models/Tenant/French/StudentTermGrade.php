<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/24/16
 * Time: 9:49 PM
 */

namespace App\Models\Tenant\French;


use Illuminate\Database\Eloquent\Model;

class StudentTermGrade extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_term_grades';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id' , 'studentId', 'course_code' , 'term_id' , 'grade'];


}