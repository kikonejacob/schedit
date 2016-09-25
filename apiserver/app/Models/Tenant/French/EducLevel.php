<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;


class EducLevel extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'educ_levels';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','description','branch','alias'];

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

    public function fees()
    {

        return $this->hasMany('App\Models\Tenant\EducLevelFee','levelId');
    }
    public function courses()
    {
        return $this->hasMany('App\Models\Tenant\EducLevelCourse','levelId');
    }


}
