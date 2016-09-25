<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;
use App\schtraits\AcademicYearTrait;

class EducLevelFee extends Model
{
    use AcademicYearTrait;
       /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_level_fees';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

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


   public function level()
    {
        return $this->belongsTo('App\Models\Tenant\EducLevel');
    }




}
