<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;
use App\Models\Tenant\EducLevel;

use App\Http\Requests;
use App\Http\Controllers\Tenant\Controller;
use App\Http\Requests\levelRequest;
use App\Http\Controllers\FilterTrait;



class levelController extends Controller
{
    use FilterTrait;
    

    private $filterFields=['name'];
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        $levels=new EducLevel;
        $levels=$this->ApplyFilters($levels,true);

        return $levels;

        //return response()->json(["data"=>$levels],200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $values=$request->all();
        $level=EducLevel::create($values);


        


        return response()->json(['message'=>'ok','data'=>$level],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $level=EducLevel::find($id);
        if (!$level){

            return response()->json(['message'=>'not found',"code"=>"404"]);
        }

        return response()->json(['data'=>$level]);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request,$id)
    {
        $values=$request->all();
        $level=EducLevel::find($id);
        if (!$level)
        {
            //return $this->error_levelNotFound();

        };

        $level->fill($values);
        $level->save();
        return response()->json(['message'=>'ok'],200);

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
