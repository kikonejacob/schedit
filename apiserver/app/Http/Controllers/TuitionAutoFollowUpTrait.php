<?php
/**
 * @todo implement tuition correction in case of :
 *         level tuition being deleted
 *         student group being deleted
 *         tuition reduction being deleted
 *
 *
 * some of the function need to be called in queue to avoid process time response:
 *            ApplyTuitionReduction
 *
 *
 *
 */
namespace App\Http\Controllers;

use App\Models\Tenant\StudentTuitionFinance;
use DB;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection;


trait TuitionAutoFollowUpTrait
{

    /**
     * Add student tuition in the database
     * @param integer $studentId
     * @param array|Collection $fees
     */
    private function AddToStudentTuition($studentId,$fees){
        foreach ($fees as $fee) {
            $data = array(
                'type'     => 'tuition.due' ,
                'amount'   => $fee->amount ,
                'ref'      => $fee->fee_code ,
                'studentId'=> $studentId
            );
            studentTuitionFinance::create($data);
        };
    }
    /**
     * This function will apply tuition amount to student financial account according to the class enrollment or/and student group
     * this function is executed when student enroll for a class
     *
     * @param  integer $studentId
     * @param  integer $classId
     * @param  string $group [$group=null] -  the student group. By default $group is null
     * @return boolean
     * @throws  Exception
     */
    public function ApplyStudentClassTuition($studentId, $classId, $group = null)
    {
        try {
            if ($group == null)
                $studentGroups = DB::table('student_group_membership')->where('studentId', $studentId)->get();
            else
                $studentGroups = [$group];

            $levelFees = DB::table('educ_level_fees')
                //->join('educ_fee_heads','educ_level_fees.fee_code','=','educ_fee_heads.code')
                ->join('educ_classes', function ($join) use ($classId) {
                    /** @var JoinClause  $join */
                    $join->on('educ_classes.levelId', '=', 'educ_level_fees.levelId')
                        ->where('educ_classes.id', '=', $classId);
                })
                ->join('educ_fee_heads', function ($join) {
                    $join->on('educ_level_fees.fee_code', '=', 'educ_fee_heads.code')
                        /** @var JoinClause  $join */
                        ->where('educ_fee_heads.type', '=', 'tuition.fee');
                })
                ->where(function ($query) use ($studentGroups) {
                    /** @var  Builder $query */
                    $query->whereIn('educ_level_fees.student_group', $studentGroups)
                        ->orWhere('educ_level_fees.student_group', '');
                })
                ->select('educ_level_fees.fee_code', 'educ_level_fees.amount')
                ->get();
            $this->AddToStudentTuition($studentId,$levelFees);
            return true;

        } catch (Exception $e) {
            //return 'error_database_transaction';
           throw new Exception('Error while applying tuition fees');

        }
    }

    /**
     * This function is called when a new tuition reduction is created for a student.
     *
     * @param integer $studentId
     * @param integer $reductionId
     * @param double $amount Amount of reduction
     * @throws Exception
     */
    public function ApplyNewReductionToStudent($reductionId,$studentId,$amount)
    {
        $data = array(
            'type' => 'tuition.reduction' ,
            'amount' => $amount ,
            'ref_id' => $reductionId ,
            'studentId' => $studentId
        );
        studentTuitionFinance::create($data);
    }

    /**
     * this function is called when a new tuition reduction is created for a group
     *
     * @param integer
     * @param string $group
     * @param double $amount Amount of reduction
     * @throws Exception
     */
    public function ApplyNewReductionToGroupOfStudents($reductionId,$group,$amount){
        $students = DB::table('student_group_membership')->where('student_group_membership.group' , '=' , $group);
        foreach ($students as $student) {
            $data = array(
                'type' => 'tuition.reduction' ,
                'amount' => $amount ,
                'ref' => $reductionId ,
                'studentId' => $student['studentId']
            );
            studentTuitionFinance::create($data);
        };

    }

    /** this function is only called when a user enroll in a class or user become a member of a new group
     * @param integer $studentId studentId
     * @param string $group [$group=null] Student group
     * @return true
     * @throws  Exception
     * */
    public function ApplyStudentTuitionReductions($studentId, $group = null)
    {

        try {
            if ($group == null)
                $studentGroups = DB::table('student_group_membership')->Where('studentId', $studentId)->get();
            else
                $studentGroups = [$group];
            $reductions = DB::table('tuition_reductions')
                ->where(function ($query) use ($studentGroups) {
                    /** @var Builder $query  */
                    $query->where('educ_level_fees.ref', $studentGroups)
                          ->andWhere('educ_level_fees.type', 'group.reduction');
                });
            foreach ($$reductions as $reduction) {
                $data = array(
                    'type' => 'tuition.reduction',
                    'amount' => $reduction->amount,
                    'ref' => $reduction->id,
                    'studentId' => $studentId);
                studentTuitionFinance::create($data);
            };
            return true;
        } catch (Exception $e) {
            throw  new Exception('Error while applying the student tuition reductions');

        }
    }


}

