<?php

namespace App\Models\Tenant;



use Illuminate\Database\Eloquent\Model;
use App\schtraits\AcademicYearTrait;

class StudentEnrollment extends Model
{
    use AcademicYearTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_enrollment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['classId','grade','studentId','acyearId'];

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

    public function student()
    {

        return $this->belongsTo("App/User");
    }

    public function levelClass()
    {
        return $this->belongsTo("App/Models/Tenant/EducClass");
    }
}
