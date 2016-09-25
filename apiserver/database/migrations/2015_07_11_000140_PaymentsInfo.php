<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PaymentsInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments_info', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("userId");
            $table->integer("mode");
            $table->string("name");
            $table->string("cardNumber");
            $table->string("CardCode");
            $table->string("adress");
            $table->string("zipcode");
            $table->boolean('reuse');
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
        Schema::drop('payments_info');
    }
}
