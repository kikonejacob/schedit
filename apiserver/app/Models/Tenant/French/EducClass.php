<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;
use App\schtraits\AcademicYearTrait;

class EducClass extends Model
{

    use AcademicYearTrait;
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_classes';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id','acyearId','created_at','updated_at'];

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
        return $this->belongsTo('App\Models\Tenant\EducLevel','levelId');
    }

     public function scopeBranch($query,$branchId)
    {
        return $query->where('branchId','=',$branchId);
    }

   



}
