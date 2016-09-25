<?php

use Illuminate\Database\Seeder;
use App\User;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(
        	[
        	 'name'=> "admin",
        	 'email'=>'admin@faker.com',
        	 'password'=>Hash::make('password'),
        	 'current_acyear'=>1,
             'role'=>"SCH_ADMIN"
        	 

        	]);
        User::create(
            [
             'name'=> "Jacob",
             'first_name'=>'Jacob',
             'email'=>'jacob@faker.com',
             'password'=>Hash::make('password'),
             'current_acyear'=>1,
             'role'=>"SCH_STUDENT"
             

            ]);
    }
}
