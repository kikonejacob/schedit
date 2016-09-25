<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EducLevelFees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_level_fees', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("acyearId");
            $table->integer("levelId");
            $table->double("amount");
            $table->integer("cashReg_id");
            $table->string("student_group"); //group of students to whom the fee is applied
            $table->string("fee_code");
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
        Schema::drop('educ_level_fees');
    }
}
