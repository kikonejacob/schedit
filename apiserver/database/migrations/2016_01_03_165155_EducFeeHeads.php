<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EducFeeHeads extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_fee_heads', function (Blueprint $table) {
            $table->string('code',65)->unique();
            $table->string('name');
            $table->enum('type',['tuition.fee','other.fee'])->default('tuition.fee');
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
        Schema::drop('educ_fee_heads');
    }
}
