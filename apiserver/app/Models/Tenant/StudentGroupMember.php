<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;


class StudentGroupMember extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_group_membership';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['studentId','group','role','note'];

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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function studentGroup()
    {

        return $this->belongTo("App/StudentGroupMember",'levelId');
    }

   

}
