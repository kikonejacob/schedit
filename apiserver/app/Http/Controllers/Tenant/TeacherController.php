<?php
/**
 *
 * User: khome
 * Date: 9/29/16
 * Time: 4:36 PM
 */

namespace App\Http\Controllers\Tenant;


use Illuminate\Http\JsonResponse;

class TeacherController extends  Controller
{
    use FilterTrait;

    protected $filterFields=['firstName'];
    /**
     * Display a listing of the resource.
     * data displayed: id, user name (first+last),
     *
     * @return Response
     */
    public function index()
    {

        $selected=[  'id',
                     DB::raw('concat(first_name," ",last_name) as  name'),
                     'email',
                     'birth_date',
                     'sex',
        ];

        $students=User::teachers()->select($selected);
        $students=$this->ApplyFilters($students,true);

        return $students;

        //return response()->json(["data"=>$students],200);
    }

    public function aggregate(){

        $masculine=DB::raw('COUNT(CASE WHEN sex=m THEN 1 ELSE 0 END)');
        $feminine=DB::raw('COUNT(CASE WHEN sex=f THEN 1 ELSE 0 END)');

        $students=User::teacher()->select('sex',DB::raw('COUNT(*) as count'))
            ->groupBy('sex');
        $students=$this->ApplyFilters($students,true);
        return $students;
    }



    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(userRequest $request)
    {
        $values=$request->except('role');
        $values['role']='SCH_STUDENT'; //Very important security measure
        //$values['password']=hash($values['birth_date']);
        user::create($values);

        return response()->json(['message'=>'ok'],201);
    }

    public function  findUser($studentId){
        return user::find($studentId);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        if ($id=='aggregate'){
            return  $this->aggregate();
        }
        $student=$this->findUser($id);
        if (!$student){
            return response()->json(['message'=>'not found',"code"=>"404"]);
        }

        return  $this->APISuccessResponse(['data'=>$student]);

    }



    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function update($id)
    {
        $values=$request->except('role');
        $student=User::students()->find($id);
        if (!$student)
        {
            //return $this->error_levelNotFound();

        };

        $student->fill($values);
        $student->save();
        return response()->json(['message'=>'ok'],200);
    }

}