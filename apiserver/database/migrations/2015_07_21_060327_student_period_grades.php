<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentPeriodGrades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_period_grades', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('studentId');
            $table->integer('periodId');
            $table->date('grade_calc_date');
            $table->double('grade');
            $table->string('grade_calc_method');
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
        Schema::drop('student_period_grades');
    }
}
