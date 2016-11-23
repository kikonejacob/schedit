<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchStorageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sch_storage',function(Blueprint $table){
            $table->bigIncrements('id');
            $table->bigInteger('owner')->unsigned();
            $table->boolean('is_original_file');
            $table->string('internal_name');
            $table->string('type');
            $table->string('context');
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
        Schema::drop('sch_storage');
    }
}
