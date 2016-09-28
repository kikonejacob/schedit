<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('sex',array('m','f','other'));
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->date("birth_date");
            $table->string("phone");
            $table->string("address1");
            $table->string("address2");
            $table->integer("current_acyear");
            $table->integer("current_term_id");
            $table->string("role");
            $table->softDeletes();
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
