<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Educotas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_cotas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("acyearId");
            $table->integer("levelId");
            $table->string("name");
            $table->double("amount");
            $table->double("amount_for_int");
            $table->integer("cashRegId");
            $table->string("code");
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
        Schema::drop('educ_cotas');
    }
}
