<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;


class PaymentPlan extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tuition_payment_plan';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','due_date','percent'];

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
