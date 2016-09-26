<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentTermGrades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_term_grades', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('studentId');
            $table->integer('term_id');
            //$table->date('grade_calc_date');
            $table->double('grade');
            $table->string('calc_method')->default('personalized');
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
        Schema::drop('student_term_grades');
    }
}
