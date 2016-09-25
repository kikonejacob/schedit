<?php


use App\Models\Tenant\EducLevelFee;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EducLevelFeeSeeder extends Seeder
{
    private function getFeeCodes (){
        /**
         * Here DB:table return an array of stdClass then we convert this array to an array of string
         */
        $dbReq = DB::table('educ_fee_heads')->select('code')->get();
        $feeCodes = array();
        foreach ($dbReq as $key => $value) {
            $feeCodes[] = $value->code;
        }
        return $feeCodes;
    }
    private function getLevelIds()
    {
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
        $feeCodes = $this->getFeeCodes();
        $data = array();
        foreach ($levels as $level) {
            foreach ($feeCodes as $feeCode) {
                $data[] = array(
                        'fee_code'      => $feeCode ,
                        'levelId'       => $level ,
                        'amount'        => 25000 ,
                        'created_at'    =>Carbon::now(),
                        //'apply_to'      => 'tuition.fee' ,
                        'student_group' => '' ,
                        'acyearId'      => 1
                );
            };
        }
        EducLevelFee::insert($data);

    }
}
