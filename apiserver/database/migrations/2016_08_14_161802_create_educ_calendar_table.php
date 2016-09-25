<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEducCalendarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_calendar', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('day',['mon,tue,wed,thu,fri,sat,sun']);
            $table->time('startTime');
            $table->time('endTime');
            $table->longText('event_title');
            $table->string('address');
            $table->string('room'); // Room Informations is not necessary a room in the school
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
        Schema::drop('educ_calendar');
    }
}
