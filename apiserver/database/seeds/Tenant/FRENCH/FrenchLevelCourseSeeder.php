<?php

use App\Models\Tenant\EducLevelCourse;
use Carbon\Carbon;
use Illuminate\Database\Seeder;


class FrenchLevelCourseSeeder extends  Seeder
{
    private function getSubjectCode(){
        /**
         * Here DB:table return an array of stdClass then we convert this array to an array of string
         */
        $dbReq = DB::table('educ_subjects')->select('code')->get();
        $subjectCodes = [];
        foreach ($dbReq as $key => $value) {
            $subjectCodes[] = $value->code;
        }
        return $subjectCodes;
    }
    private function getLevelIds(){
        $levels = array();
        //Getting level
        $levelsC = DB::table('educ_levels')->select('id')->get();
        foreach ($levelsC as $key => $value) {
            $levels[] = $value->id;
        }
        return $levels;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $levels = $this->getLevelIds();
        $subjectCodes = $this->getSubjectCode();
        $data=array();
        foreach ($levels as $level) {
            foreach ($subjectCodes as $subjectCode) {
                $data[] = array(
                    'subject_code' => $subjectCode ,
                    'levelId'      => $level ,
                    'coefficient'  => 3 ,
                    'max_points'   => 20 ,
                    'acyearId'     => 1 ,
                    'created_at'    => Carbon::now()
                );
            };
        }
        EducLevelCourse::insert($data);

    }

}