<?php

/**
 * Seed default data into the database
 */

use App\Models\Tenant\EducLevelCourse;
use App\Models\Tenant\SchTenantOptions;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant\EducLevel;
use App\Models\Tenant\Branch;
use App\Models\Tenant\EducLevelFee;
use App\Models\Tenant\EducSubject;
use App\Models\Tenant\EducFeeHead;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        EducLevel::truncate();
        Branch::truncate();
        EducLevelFee::truncate();
        EducSubject::truncate();
        EducFeeHead::truncate();
        EducLevelCourse::truncate();
        SchTenantOptions::truncate();

        DB::table('ui_grids')->truncate();
        DB::table('oauth_clients')->truncate();
        Model::unguard();
        $this->call(BranchSeeder::class);
        $this->call(FrenchLevelSeeder::class);
        //must be run in order
        $this->call(FrenchFeeHeadSeeder::class);
        $this->call(FrenchSubjectHeadSeeder::class);
        $this->call(EducLevelFeeSeeder::class);
        $this->call(FrenchLevelCourseSeeder::class);
        $this->call(FrenchSchoolConfigSeeder::class);
        Model::reguard();
        //DB::statement('SET FOREIGN_KEY_CHECKS=0');
    }
}
