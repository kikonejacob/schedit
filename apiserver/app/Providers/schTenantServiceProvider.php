<?php
/**
 * This Provider is used for Tenant application
 */
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class schTenantServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        App::bind('TenantAuth', function()
        {
            return new \App\Lib\Tenant\TenantAauth;
        });
    }
}
