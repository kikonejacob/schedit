<?php

namespace App\Listeners\Tenant;

use App\Events\Tenant\StudentEnrolled;
use App\Lib\Tenant\TuitionAutoFollowUpTrait;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class StudentEnrollment
{
    use TuitionAutoFollowUpTrait;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  StudentEnrolled  $event
     * @return void
     */
    public function handle(StudentEnrolled $event)
    {
        $enrollment=$event->enrollment;
        //var_dump($enrollment);
        $this->ApplyStudentClassTuition($enrollment->studentId,$enrollment->classId);
    }
}
