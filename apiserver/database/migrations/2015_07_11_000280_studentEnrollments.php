<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentEnrollments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_enrollment', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('studentId');
            $table->integer("acyearId");
            $table->integer("classId");
            $table->double("grade");
            $table->integer('payment_plan')->default(-1);
            $table->integer("status");
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
        Schema::drop('student_enrollment');
    }
}
