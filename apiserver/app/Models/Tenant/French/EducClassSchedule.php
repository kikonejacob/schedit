<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EducClassSchedule extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_class_timeline';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['classId','start_time','end_time','day','course_code','room_id'];

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
    public function classes()
    {

        return $this->hasMany('App\Models\Tenant\EducClass','levelId');
    }

}
