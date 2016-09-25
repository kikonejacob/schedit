<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentTuitionInvoices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_tuition_invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("studentId");
            $table->integer("paymentId");
            $table->double("amount");
            $table->string("doc",255);
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
        Schema::drop('student_tuition_invoices');
    }
}
