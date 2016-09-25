<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class studentCotaInvoiceDetails extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_cota_invoice_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['amount','cotaId','invoiceId'];

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
