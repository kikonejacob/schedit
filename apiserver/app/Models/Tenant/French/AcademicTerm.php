<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/24/16
 * Time: 10:16 PM
 */

namespace App\Models\Tenant\French;


use Illuminate\Database\Eloquent\Model;

class AcademicTerm extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table='educ_academic_terms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable=['name','start_date','end_date','appreciation_method'];

}