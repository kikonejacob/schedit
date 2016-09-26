<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/24/16
 * Time: 9:50 PM
 */

namespace App\Models\Tenant\French;


use App\schtraits\AcademicYearTrait;
use Illuminate\Database\Eloquent\Model;

class StudentSequenceGrade extends Model
{
    use AcademicYearTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_sequence_grades';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id' , 'studentId', 'course_code' , 'term_id' , 'grade'];

    public function course(){
        return $this->belongsTo('App\Tenant\French\AcademicTerm','term_id');
    }

}