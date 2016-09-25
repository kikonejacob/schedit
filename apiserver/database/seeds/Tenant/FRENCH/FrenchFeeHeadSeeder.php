<?php

use Illuminate\Database\Seeder;
use App\Models\Tenant\EducFeeHead;

class FrenchFeeHeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data=array(
            [
                'name' => 'Scolarité' ,
                'code' => 'SCOL' ,
                'type' => 'tuition.fee'
            ] ,
            [
                'name' => 'Inscriptions' ,
                'code' => 'INSCRIPT' ,
                'type' => 'tuition.fee'
            ] ,
            [
                'name' => 'Cotisation des parents d\'élèves' ,
                'code' => 'APE' ,
                'type' => 'tuition.feee'
            ] ,
            [
                'name' => 'Uniforms' ,
                'code' => 'UNIFORM' ,
                'type' => 'tuition.feee'
            ]
       );
        EducFeeHead::insert($data);
    }
}
