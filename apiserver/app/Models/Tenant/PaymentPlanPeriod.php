<?php
/**
 * Represent a period for a payment plan
 * User: khome
 * Date: 9/26/16
 * Time: 12:33 AM
 */

namespace App\Models\Tenant;


use Illuminate\Database\Eloquent\Model;

class PaymentPlanPeriod extends  Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tuition_payment_plan_detail';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name' , 'due_date' , 'percent' , 'plan_id'];

    public function paymentPlan()
    {
        return $this->belongsTo('App/Models/Tenant/PaymentPlan');
    }

}