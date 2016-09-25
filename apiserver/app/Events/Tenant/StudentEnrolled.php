<?php

namespace App\Events\Tenant;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\Tenant\StudentEnrollment;

class StudentEnrolled extends Event
{
    use SerializesModels;

    /** @var  StudentEnrollment */
    public $enrollment;

    /**
     * Create a new event instance.
     *
     * @param StudentEnrollment $enrollment
     */
    public function __construct(StudentEnrollment $enrollment)
    {
        $this->enrollment=$enrollment;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
