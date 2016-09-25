<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_info', function (Blueprint $table) {
            $table->integer('studentId')->unique();
            $table->string("country");
            $table->string("permanent_address");
            $table->integer("immigration_status");
            $table->string("Emergy_person");
            $table->string("Emergency_call");
            $table->integer("parent1Id");
            $table->integer("parent2Id");
            $table->integer("parent3Id");
            $table->boolean("disabled");
            $table->string("religion");
            $table->string("status");
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
        Schema::drop('student_info');
    }
}
