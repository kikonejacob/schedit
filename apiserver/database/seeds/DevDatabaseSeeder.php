<?php
/**
 * Seed Fixtures for developments
 */

use App\Models\Tenant\EducLevelCourse;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant\EducLevel;
use App\Models\Tenant\Branch;
use App\Models\Tenant\EducClass;
use App\User;
use App\Models\Tenant\AcademicYear;
use App\Models\Tenant\EducLevelFee;
use App\Models\Tenant\StudentEnrollment;
use App\Models\Tenant\StudentInfo;
use App\Models\Tenant\EducSubject;
use App\Models\Tenant\EducFeeHead;


class DevDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        EducClass::truncate();
        User::truncate();
        AcademicYear::truncate();
        StudentEnrollment::truncate();
        StudentInfo::truncate();
        DB::table('ui_grids')->truncate();
        DB::table('oauth_clients')->truncate();
        Model::unguard();
        $this->call(FrenchClassSeeder::class);
        $this->call(userSeeder::class);
        $this->call(academicYearSeeder::class);
        //must be run in order
        $this->call(StudentSeeder::class);
        $this->call(FrenchStudentEnrollSeeder::class);
        $this->call(studentInfoSeeder::class);
        $this->call(uigridSeeder::class);
        $this->call(OAuthClientSeeder::class);
        Model::reguard();
        //DB::statement('SET FOREIGN_KEY_CHECKS=0');
    }
}
