<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/24/16
 * Time: 9:37 PM
 */

namespace App\Models\Tenant\French;


use App\schtraits\AcademicYearTrait;
use Illuminate\Database\Eloquent\Model;

class StudentCourseGrade extends Model
{
    use AcademicYearTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_course_grade';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id' , 'studentId' , 'term_id' , 'course_code' , 'grade' , 'calc_method' , 'calc_formula'];

    public function sequenceGrades()
    {
        return $this->hasMany('App\Models\Tenant\French\StudentSequenceGrade','course_code');
    }

    public function term()
    {
        return $this->belongsTo('App\Models\Tenant\French\AcademicTerm','term_id');
    }

}