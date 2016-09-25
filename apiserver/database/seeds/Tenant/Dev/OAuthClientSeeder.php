<?php

use Illuminate\Database\Seeder;
use App\User;

class OAuthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0;$i<5;$i++){
            DB::table('oauth_clients')->insert([
                'id'     => "id$i" ,
                'secret' => "secret$i" ,
                'name'   => "client$i"
            ]);

        }
    }
}
