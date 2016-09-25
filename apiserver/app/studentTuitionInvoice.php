<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class studentInvoice extends Model 
{
    

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_tuition_invoices';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarde = ['*'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [ 'created_at','updated_at'];
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';


    public function student()
    {
        return $this->belongsToMany("App/user");

    } 
    public function TuitionInvoices(){
        
       return $this->hasMany("App\studentPayment");
    }

};

?>
