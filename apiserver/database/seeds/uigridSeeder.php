<?php

use Illuminate\Database\Seeder;

class uigridSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function(){
        	$tableName='ui_grids';


        	DB::table($tableName)->insert(['name'=>'type',
        								  'label'=>'Transaction',
        								  'cell'=>'string',
        								  'editable'=>false,
        								  'group'=>'ui-student-tuition'
        								]);
        	DB::table($tableName)->insert(['name'=>'refId',
        								  'label'=>'reference',
        								  'cell'=>'simpleInt',
        								  'editable'=>false,
        								  'group'=>'ui-student-tuition'
        								]);
        	
        	DB::table($tableName)->insert(['name'=>'amount',
        								  'label'=>'Amount',
        								  'cell'=>'number',
        								  'editable'=>false,
        								  'group'=>'ui-student-tuition'
        								]);
        	

        });
    }
}
