<?php

/*obsolete see academicAcyear
*/
namespace App\schtraits;
use Illuminate\Support\Facades\Auth;

trait schModelTrait
{

	public function scopeCurrentAcyear($query)
    {
       return $query->where('acyearId',Auth::user()->current_acyear);

    }

    public function scopeBranch($query,$branchId)
    {
        return $query->where('branchId','=',$branchId);
    }

}

?>