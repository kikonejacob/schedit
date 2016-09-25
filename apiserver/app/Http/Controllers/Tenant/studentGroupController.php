<?php
namespace App\Http\Controllers\Tenant;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Tenant\StudentGroup;
use App\Http\Controllers\TuitionAutoFollowUpTrait;
use Response;
use Validator;


class StudentGroupController extends Controller
{
    use TuitionAutoFollowUpTrait;
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $groups=StudentGroup::all();
        return response()->json(["data"=>$groups],200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request The request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $rules=[
            'name'          => 'required|string',
            'description'   => 'required|string',
            'visibility'    => 'required|string',
            'type'          => 'required|in:public,private'
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails())
        {
            return response()->json(['error','message'=>$validator->messages()],422);
        }
        $values=$request->only(['name','description','visibility','type',]);
        StudentGroup::create($values);
        return response()->json(['message'=>'ok'],200);
    }
    /**
     * Display the specified resource.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function show(Request $request)
    {
        $rules=['group'=>'required|string'];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails())
        {
            return response()->json(['error','message'=>$validator->messages()],422);
        }
        $group=StudentGroup::where('code',$group)->get();
        return response()->json(['message'=>$group],200);
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
