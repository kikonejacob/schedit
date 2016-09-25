<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;

class StudentTuitionFinance extends Model
{
    /**
     *  The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_tuition_finances';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['studentId',"amount","refId","type","ref"];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['accounted', 'created_at','updated_at'];
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    public function student()
    {
        return $this->belongsTo('App\User');

    }

}
