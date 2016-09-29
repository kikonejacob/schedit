<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/29/16
 * Time: 2:12 PM
 */

namespace App\Models\Tenant;


use App\schtraits\AcademicYearTrait;
use Illuminate\Database\Eloquent\Model;

class StudentAbsence extends Model
{
    use AcademicYearTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_student_abscences';




}