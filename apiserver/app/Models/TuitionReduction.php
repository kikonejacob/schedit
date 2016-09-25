<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;

class TuitionReduction extends Model
{
    /**
     *  The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tuition_reduction';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['ref_id',"amount","type","ref","name","reduction"];

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

    

}
