<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentCotaInvoicesDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_cota_invoices_details', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("invoiceId");
            $table->integer("cotaId");
            $table->double("amount");
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
        Schema::drop('student_cota_invoices_details');
    }
}
