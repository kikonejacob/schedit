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
        $enrollement=$event->enrollment;
        //var_dump($enrollement);
        $this->ApplyStudentClassTuition($enrollement->studentId,$enrollement->classId);
    }
}
