<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTenantMgrUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('tenants-manager')->create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->date("birth_date");
            $table->string("phone");
            $table->string("address1");
            $table->string("address2");
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
