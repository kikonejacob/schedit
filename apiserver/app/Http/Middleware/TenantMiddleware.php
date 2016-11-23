<?php



namespace App\Http\Middleware;

use Closure;
use Config;
use DB;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $tenantName=$request->route()->parameters()['tenant'];
        $tenant=DB::connection('tenants-manager')->table('tenants')
                    ->where('name','=',$tenantName)
                    ->first();
        /*Configuration for the tenant*/

        Config::set('database.connections.tenant', array(
            'driver'    => 'mysql',
            'host'      => env('DB_HOST', 'localhost'),
            'database'  => $tenant->internal_name,
            'username'  => env('TENANTS_USER', ''),/*For Now*/
            'password'  => env('TENANTS_PASSWORD', ''),
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
            'engine'    => null,


        ));

        Config::set('database.default', 'tenant');
        Config::set('sch.tenant.internal_name',$tenant->internal_name);
        Config::set('sch.tenant.storage_type',$tenant->storage_type);
        Config::set('sch.tenant.storage_credentials',$tenant->storage_credentials);

        return $next($request);
    }
}
