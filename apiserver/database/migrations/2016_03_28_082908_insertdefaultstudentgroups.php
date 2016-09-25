<?php

/** this class does note create a structure but provide default data to a structure*/

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class Insertdefaultstudentgroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         $models = array(
                array('code' => 'scholarship.winner','caption'=>'Scholarship winner'),
                array('code' => 'international.student','caption'=>'International student'),
                array('code' => 'outofstate.student','caption'=>'Out of State Student'),
         );

        DB::table('student_group')->insert($models);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
