<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentTuitionPaymentPlan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_tuition_payment_plan', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("acyearId");
            $table->integer("PlanId");
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
        Schema::drop('student_tuition_payment_plan');
    }
}
