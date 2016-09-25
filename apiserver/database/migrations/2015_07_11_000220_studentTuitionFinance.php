<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentTuitionFinance extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_tuition_finances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("studentId");
            $table->string("type");
            $table->integer("refId");
            $table->string("ref");
            $table->double("amount");
            $table->double("accounted");
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
        Schema::drop('student_tuition_finances');
    }
}
