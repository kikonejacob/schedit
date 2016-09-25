<?php

use Illuminate\Database\Seeder;
use App\Models\Tenant\EducSubject;

class FrenchSubjectHeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            ['name' => 'Français' , 'code' => 'FRANC' , 'type' => 'GENERAL'] ,
            ['name' => 'Anglais' , 'code' => 'ANGL' , 'type' => 'GENERAL'] ,
            ['name' => 'Mathematics' , 'code' => 'MATH' , 'type' => 'GENERAL'] ,
            ['name' => 'Histoire-Géographie' , 'code' => 'HIST-GEO' , 'type' => 'GENERAL'] ,
            ['name' => 'Géographie' , 'code' => 'GEO' , 'type' => 'GENERAL'] ,
            ['name' => 'Histoire' , 'code' => 'HIST' , 'type' => 'GENERAL'] ,
            ['name' => 'Physique' , 'code' => 'PHYS' , 'type' => 'GENERAL'] ,
            ['name' => 'Physique-Chimie' , 'code' => 'PHYS-CHIM' , 'type' => 'GENERAL'] ,
            ['name' => 'Chimie' , 'code' => 'CHIM' , 'type' => 'GENERAL'] ,
            ['name' => 'Epreuve Pedagogiques et Sportive' , 'code' => 'EPS' , 'type' => 'GENERAL'] ,
            ['name' => 'Circuits' , 'code' => 'CIRCUIT' , 'type' => 'TECHNIC'] ,
            ['name' => 'DESSIN' , 'code' => 'DESSIN' , 'type' => 'TECHNIC']
        );
        EducSubject::insert($data);
    }
}
