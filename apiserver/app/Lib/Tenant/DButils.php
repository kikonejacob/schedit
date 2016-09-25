<?php 

namespace App\Lib\Tenant\DButils;
use DB;





class consts
{

	const STUDENT_ENROLLMENT='student_enrollment';
	const EDUC_CLASS='educ_classes';
	const STUDENT='users';
	const ACADEMIC_YEAR='academic_years';
	const EDUC_LEVEL='educ_levels';

	const ALIAS_ACYEAR_NAME=array("acyear_name",self::ACADEMIC_YEAR.".name");

	const ALIAS_STUDENT_NAME=array("student_name",
							       'CONCAT('.self::STUDENT.'.last_name,'.self::STUDENT.'.first_name)');

	const ALIAS_CLASS_NAME=array("class_name",self::EDUC_CLASS.'.name');
	const ALIAS_CLASS_DESCRIPTION=array("class_description",self::EDUC_CLASS.'.description');
	
	const ALIAS_LEVEL_NAME=array("level_name",self::EDUC_LEVEL.'.name');

	static function ALIAS_ENROLLMENT_COUNT($classId){
		return array("enrollments_count","( SELECT count(*) FROM ".self::STUDENT_ENROLLMENT." WHERE classId=".$classId.") ");
	}

	static function  ALIAS_PARSE($alias,$options=null){
	
	        return DB::raw($alias[1].' as '.$alias[0]);
	}

	static function MACRO($item){

	}

}

 ?>