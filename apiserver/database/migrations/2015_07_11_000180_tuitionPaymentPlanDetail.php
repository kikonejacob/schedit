<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TuitionPaymentPlanDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tuition_payment_plan_detail', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("planId");
            $table->date("due_date");
            $table->double("percent");
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
        Schema::drop('tuition_payment_plan_detail');
    }
}
