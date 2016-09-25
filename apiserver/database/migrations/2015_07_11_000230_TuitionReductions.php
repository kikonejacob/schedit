<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TuitionReductions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tuition_reductions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("ref_id");
            $table->string("ref");
            $table->string("type")->default('student.reduction');
            $table->double("amount");
            $table->string('name');
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
        Schema::drop('tuition_reductions');
    }
}
