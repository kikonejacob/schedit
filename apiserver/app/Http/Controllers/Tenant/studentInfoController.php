<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Tenant\Controller;
use App\Models\Tenant\StudentInfo;
use App\User;

class StudentInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($studentId)
    {
        $student=User::where('Id',$studentId)->get();
        
        if (!$student)
        {
            return response()->json(["message"=>'student not found'],404);
        }
        $studentInfo=studentInfo::where('studentId',$studentId)->get();

        return response()->json(["data"=>$studentInfo],200);
    }

   
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request,$studentId)
    {
        $values=$request->all();
        $attrib=['studentId'=>$studentId];
        studentInfo::updateOrCreate($attrib,$values)->get();
        return response()->json(['message'=>'ok', 'return'=>$studentId],201);
    }

    
}
