<?php

namespace App\Models\Te;

use Illuminate\Database\Eloquent\Model;


class SchSelection extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'sch_temp_selections';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','group'];

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
