<?php

namespace App\schtraits;


trait studentTrait
{

	public function ScopeStudents($query)
    {
        return  $query->where('role','SCH_STUDENT');
    }

    
    public function studentInfo()
    {
       return  $this->hasOne('App\Models\Tenant\StudentInfo','studentId');
    }

    public function enrollments()
    {
    	return $this->hasMany('App\Models\Tenant\StudentEnrollment','studentId');
    }

    public function tuition(){
    	return $this->hasMany('App\Models\Tenant\StudentTuitionFinance','studentId');
    }



}

?>