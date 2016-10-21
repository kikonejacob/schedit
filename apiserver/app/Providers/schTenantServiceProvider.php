<?php
/**
 * This Provider is used for Tenant application
 */
namespace App\Providers;

use Config;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class schTenantServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
       $request = app(\Illuminate\Http\Request::class);
        if (strpos($request->url(),'/api/v1')>0)
        {
            Config::set('database.default', 'tenant');
            //var_dump($request->url());
        }


    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('TenantAuth', function()
        {
            return new \App\Lib\Tenant\TenantAauth;
        });

    }
}
