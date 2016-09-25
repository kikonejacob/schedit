<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTuitionFees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eng_courses_fees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fee_code');
            $table->string('amount');
            $table->string('apply_to'); // must be a course.fee or group.fee
            $table->integer('level');
            $table->integer('group');
            $table->string('description');
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
        Schema::drop('eng_courses_fees');
    }
}
