<?php
use App\Models\Tenant\SchTenantOptions;
use Illuminate\Database\Seeder;

/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/28/16
 * Time: 7:33 AM
 */
class FrenchSchoolConfigSeeder extends  Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            ['option_name' => 'name' , 'option_value' => 'MonEcole' , 'group' => 'school.information'] ,
            ['option_name' => 'tel' , 'option_value' => '000 000 000' , 'group' => 'school.information'] ,
            ['option_name' => 'email' , 'option_value' => 'monemail@exemple.com' , 'group' => 'school.information'] ,
        );
        SchTenantOptions::insert($data);
    }


}