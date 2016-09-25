<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;

use App\Http\Requests;

use Illuminate\Support\Facades\Auth;


class PasswordGrantVerifier extends Controller
{
    public function verify($username, $password)
	{
	      $credentials = [
	        'email'    => $username,
	        'password' => $password,
	      ];


	      if (Auth::once($credentials)) {

	          return Auth::user()->id;
	      }

	      return false;
	}
}

?>