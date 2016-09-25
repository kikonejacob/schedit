<?php

namespace App\Model\Tenant\French;

use App\schtraits\AcademicYearTrait;
use Illuminate\Database\Eloquent\Model;

class EducLevelCourseGrade extends Model
{
    use AcademicYearTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_sequence_grades';

    /**
     * The The attributes that are mass assignable.
     * @var array
     */
    protected  $fillable = ['studentId','term_id','course_code','grade'];

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
    protected $primaryKey = 'id';


    public function course()
    {
        return $this->belongsTo('App\Models\Tenant\EducLevelCourse');
    }
}
