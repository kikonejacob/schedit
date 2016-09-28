<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentSequencesGrades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_sequence_grades', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('studentId');
            $table->integer('term_id');
            $table->string('course_code');
            $table->enum('enum',['published','editing']);
            $table->double('grade');
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
        Schema::drop('student_sequence_grades');
    }
}
