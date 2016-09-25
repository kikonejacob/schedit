<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;


class StudentGroup extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'student_group';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['code','caption','description','type','visibility'];

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
    public function students()
    {
        return $this->hasMany("App/StudentGroupMember",'levelId');
    }

   

}
