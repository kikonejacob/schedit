<?php

namespace App\Http\Controllers\Tenant;

use App\Models\Tenant\EducClass;
use Illuminate\Http\Request;

use App\Http\Requests;


class branchClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($branchId)
    {
        return EducClass::where("branchId",$branchId);
    }

    
}
