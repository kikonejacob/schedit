<?php

namespace App\Http\Controllers\Tenant\French;

use App\Http\Controllers\FilterTrait;
use App\Http\Controllers\Tenant\Controller;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Tenant\EducTerm;
use Response;
use Validator;

class AcademicTermController extends Controller
{
    use FilterTrait;

    /**
     * The rule for validating saving or updating the record
     * @var array $rules
     */
    protected   $rules=array(
        'name'       => 'required|string' ,
        'start_date' => 'required|data' ,
        'end_date'   => 'required|data' ,
        'sequence'   => 'required|number'
    );
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $result=EducTerm::all();
        /** @var JsonResponse $result */
        $result=$this->ApplyFilters($result,true);
        return $result;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        /**Validation or request arguments*/
        $validator = Validator::make($request->all(),$this->rules);
        if ($validator->fails()) {
            return response()->json(['error', 'message' => $validator->messages()], 422);
        }
        /** End validation */

        $data=$request->only(['name','start_date','end_date','sequence']);
        $result=EducTerm::create($data);
        return Response::json(['message'=>'success','data'=>$result],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $result=EducTerm::find($id);
        return Response::json(['message'=>'success','data'=>$result],201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        /**Validation or request arguments*/
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            return response()->json(['error', 'message' => $validator->messages()], 422);
        }
        /** End validation */
        $data=$request->only(['name','start_date','end_date','sequence']);
        /** @var EducTerm $term */
        $term=EducTerm::find($id);
        foreach ($data as $key=>$value){
            $term[$key]=$value;
        }
        $term->save();
        return Response::json(['message'=>'success','data'=>$term],201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /**@to implement delete with cascading effect */
    }
}
