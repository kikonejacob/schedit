<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EducLevels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educ_levels', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name");
            $table->string('alias');
            $table->string('branch');
            $table->string("description");
            $table->enum("status",['active','disabled'])->default('active');
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
        Schema::drop('educ_levels');
    }
}
