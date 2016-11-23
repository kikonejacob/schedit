<?php

namespace App\Jobs\TenantMgr;

use App;
use App\Jobs\Job;
use App\TenantManager\Tenant;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;


class CreateTenant extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    private $tenant;


    /**
     * Create a new job instance.
     *
     * @param   array $tenantConfig
     */
    public function __construct($tenantConfig)
    {
        $this->tenant=$tenantConfig;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $tenant=new Tenant($this->tenant);
        $tenant->createTenant();
    }
}
