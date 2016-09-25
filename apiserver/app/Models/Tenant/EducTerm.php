<?php
namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;
use App\schtraits\AcademicYearTrait;
class EducTerm extends Model
{
    use AcademicYearTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table='educ_periods';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable=['name','start_date','end_date','sequences'];

}