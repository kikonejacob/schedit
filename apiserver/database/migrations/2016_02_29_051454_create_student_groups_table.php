<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('student_group', function (Blueprint $table) {
            $table->string('code')->primary();
            $table->string("caption");
            $table->longText("description");
            $table->enum('type',['private','public']);
             $table->enum('visibility',['public','members']);
            $table->integer('ownerId');
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
          Schema::drop('student_group');
    }
}
