<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTenantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::connection('tenants-manager')->create('tenants', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('owner_id');
            $table->string('name');
            $table->enum('type',['french-system','english-system']);
            $table->boolean('is_original_file')->default(false);
            $table->string('internal_name');
            $table->enum('storage_type',['local','amazon-s3','dropbox','one-drive','google-drive','rackspace']);
            $table->longText('storage_credentials');
            $table->string('storage_service_client_id');
            $table->string('storage_service_client_token');
            $table->enum('status',['active','creationFailed','suspended','deleted','expired']);
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
        Schema::drop('tenants');
    }
}
