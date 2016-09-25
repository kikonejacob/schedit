<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentGroupMembership extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('student_group_membership', function (Blueprint $table) {
            $table->increments('id');
            $table->string('group');
            $table->integer("studentId");
            $table->string('role');
            $table->longText('notes');
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
         
          Schema::drop('student_group_membership');
    }
}
