<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEducClassTimelineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_class_timeline', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('day',['mon,tue,wed,thu,fri,sat,sun']);
            $table->time('start_ime');
            $table->time('end_ime');
            $table->integer('classId');
            $table->integer('course_code');
            $table->integer('room_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('educ_class_timeline');
    }
}
