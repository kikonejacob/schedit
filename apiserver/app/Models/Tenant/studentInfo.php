<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;

class StudentInfo extends Model
{
	 /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_info';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['created_at','updated_at'];

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
    protected $primaryKey = 'studentId';

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
