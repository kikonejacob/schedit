<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\FilterTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Tenant\TuitionReduction;
use App\Http\Controllers\TuitionAutoFollowUpTrait;
use Mockery\CountValidator\Exception;
use  Response;
use Validator;

class tuitionReductionController extends Controller
{
    use TuitionAutoFollowUpTrait;
    use FilterTrait;
    protected  $filterFields=['name'];

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $applyTo = "(CASE type
                                    WHEN 'student.reduction' THEN  (select user.name, from user where (id=refId))
                                    WHEN 'group.reduction'   THEN (select group.name, from user where (code=ref))
                                    ELSE NULL 
                     END) as appliedTo";
        $reductions = TuitionReduction::select($applyTo , 'amount' , 'ref' , 'ref_if' , 'name' , 'description');


        return $this->APISuccessResponse($this->ApplyFilters($reductions,true));
    }

    /**
     * Store a newly created resource in storage.
     *
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        /**Validation or request arguments*/
        $rules=[
            'type' => 'required|regex:(group\.reduction)|(student\.reduction)',
            'amount'=>'required|double',
            'description'=>'string',
            'name'=>'required|string',
        ];
        $validator = Validator::make($request->all(),$rules);

        $validator->sometimes('studentId','required|number',function ($input){
            return $input->type=='group.reduction';
        });
        $validator->sometimes('group','required|number',function ($input){
            return $input->type=='student.reduction';
        });

        if ($validator->fails()) {
            return response()->json(['error', 'message' => $validator->messages()], 422);
        }
        /** End validation */


        try{
            $values=$request->all();

            $reduction=[ "ref"         =>isset($values["group"])     ? $values["group"]     : "" ,
                "ref_id"      =>isset($values['studentId']) ? $values['studentId'] : -1,
                "type"        =>$values['type'],
                "amount"      =>$values['amount'],
                "name"        =>$values['name'],
                "description" =>$values['description']
            ];
            $result=TuitionReduction::create($reduction);
            switch($reduction['type'])
            {
                case 'student.reduction':
                    $this->ApplyNewReductionToStudent($result->id,$reduction['studentId'],$reduction['amount']);
                    break;
                case 'group.reduction':
                    $this->ApplyNewReductionToGroupOfStudents($result->id,$reduction['group'],$reduction['amount']);
                    break;
                /*case 'global.reduction':
                break;*/
            }


        }
        catch(Exception $e){
              return Response::json(['error','message'=>$e->getMessage()],422);
        }
        return Response::json(['message'=>'ok','data'=>$result,$e],200);

    }

    /**
     * Display the specified resource.
     *
     * @param $reductionId
     * @return JsonResponse
     * @internal param int $id
     */
    public function show($reductionId)
    {
        $reduction=TuitionReduction::where('id',$reductionId);
        if ($reduction)
        {   
            return response()->json(['data'=>$reduction],200);
        }
        else
           return response()->json(['error:ressource cannot be found'],401);

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
