<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
       /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'academic_years';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','start_on','end_on','statuts'];

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
    protected $primaryKey = 'id';}
