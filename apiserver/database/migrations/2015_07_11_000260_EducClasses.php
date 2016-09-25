<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EducClasses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_classes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer("levelId")->unsigned();
            $table->integer("acyearId");
            $table->string("alias");
            $table->integer('max_size')->unsigned()->defaut(25);
            $table->time('start_date');
            $table->time('end_date');
            $table->integer('principal_teacher_id');
            $table->integer("branchId")->unsigned();
            $table->string("name");
            $table->string("room");
            $table->text("description");
            $table->integer("status");
            $table->timestamps();
            $table->foreign("levelId")->references("id")
                                      ->on("educ_levels")
                                      ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('educ_classes');
    }
}
