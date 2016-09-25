<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Models\Tenant\StudentGroupMember;
use App\Models\Tenant\StudentGroup;
use App\User;
use App\Http\Controllers\TuitionAutoFollowUpTrait;
use Validator;
use Response;
use Exception;
use App\Models\Tenant\StudentEnrollment;

class studentMembershipController extends Controller
{
    use TuitionAutoFollowUpTrait;

    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return JsonResponse
     */
    public function index($studentId)
    {
        $studentGroup=StudentGroupMember::where('studentId',$studentId)->get();
        return response()->json(["data"=>$studentGroup],200);
    }

    /**
     * Add a membership to a specific group
     * @param   integer $studentId
     * @param   integer  $groupName
     * @return boolean
     * @throws  Exception
     */
    private function addMembership($studentId,$groupName){
        $student=User::where('studentId',$studentId)->get();
        if ($student)
        {
            $group=studentGroup::where($groupName);
            if ($group){
                try {
                    $enrollments=studentEnrollment::where('studentId',$studentId);
                    // For each enrollment will add all the fees which are specific to the groups
                    /** @var array $enrollment */
                    foreach ($enrollments as $enrollment){
                        $this->ApplyStudentClassTuition($studentId,$enrollment['classId'],$group->code);
                    }
                    $this->ApplyStudentTuitionReductions($studentId,$group->code);
                    return true;
                }
                catch (Exception $e)
                {
                    throw  new Exception('Error adding student to the group');

                }
            }
       }
    }
   
    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        /**Validation or request arguments*/
        $rules=[
            'studentId' => 'required|string'
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            return response()->json(['error', 'message' => $validator->messages()], 422);
        }
        /** End validation */

        /** @var integer $studentId*/
        $studentId=$request->get('studentId');
        /** @var  integer $group */
        $group=$request->get('group');
        try
        {
            $this->addMembership($studentId,$group);
            $values=$request->only(['studentId','group']);
            StudentGroupMember::create($values) ;
            return response()->json(['message'=>'ok'],200);
        }
        catch(\Exception $error){
            return response()->json(['error','message'=>$error->getMessage()],422);
        }



        
    }

    /**
     * Display the specified resource.
     *
     * @param  integer  $studentId
     * @param  string $group
     * @return JsonResponse
     */
    public function show($studentId,$group)
    {
        var_dump($group);
        $student=User::where('studentId',$studentId);
        if ($student)
        {   
            $group=StudentGroup::where($group);
            if ($group){
                return response()->json(['data'=>$group],200);
            }
            else
                return response()->json(['error:Resource cannot be found'],401);
        }
        else
           return response()->json(['error:Resource cannot be found'],401);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
