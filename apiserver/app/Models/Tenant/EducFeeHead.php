<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;

class EducFeeHead extends Model
{
       /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_fee_heads';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','code','type'];

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
    protected $primaryKey = 'code';

}
