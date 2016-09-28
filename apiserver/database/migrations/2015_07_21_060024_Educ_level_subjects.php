<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EducLevelSubjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_level_courses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('levelId')->unsigned();
            $table->integer('acyearId');
            $table->string('subject_code');
            $table->string('coefficient');
            $table->double('max_points');
            $table->string('period_calc_method');
            $table->string('appreciation_method');
            $table->timestamps();
            $table->foreign('levelId')->references('id')->on('educ_levels')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('educ_level_courses');
    }
}
