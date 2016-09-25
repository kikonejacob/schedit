<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'branches';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','parent_id','name'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];


    public $timestamps = false;

    public function parent()
    {
        return $this->belongsTo('App/branch', 'parent_id');
    }

    public function children()
    {
        return $this->hasMany('App/branch', 'parent_id');
    }
}
