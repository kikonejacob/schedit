<?php

use Illuminate\Database\Seeder;
use App\Models\Tenant\StudentInfo;

class studentInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         StudentInfo::create(
            [
                'studentId'          => 2 ,
                'country'            => 'my country' ,
                'immigration_status' => 1 ,

            ]);
    }
}
