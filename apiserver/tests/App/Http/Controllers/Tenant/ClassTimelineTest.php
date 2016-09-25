<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Controllers\Tenant\ClassSchedule;

class ClassTimeline extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testShouldReturnClassSchedule()
    {
        $this->visit('/')
             ->see('Laravel 5');

    }
}
