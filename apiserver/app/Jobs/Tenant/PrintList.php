<?php

namespace App\Jobs\Tenant;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PDF;

use Underscore\Types\Arrays;


function urlFormat($url,$args){
    return preg_replace_callback(
                '/:(\w+)/',
                function ($matches)use($args) {
                    $id=str_replace($matches,':','');
                    return (gettype($args["id"]) != 'Null')
                            ? $args["id"]
                            : $matches
                  ;     
                },
                $url
            );
}

function sortByOrder($columns,$columnsMeta){
    $length=count($columns);
    $result=[];
    foreach ($columns as $column) {

         $meta=Arrays::find($columnsMeta,function($meta)use($column){
                         return $meta->columnName==$column;
                     });

         if ($meta==null)
         {
            $result[]=["name"=>$column,"caption"=>$colums,'order'=>$length--];
         }
         else
        if (isset($meta->order))
        {


            $result[]=["name"=>$column,"caption"=>$meta->displayName,'order'=>$meta->order-1];
        }
        else
        {
            $result[]=["name"=>$column,"caption"=>$meta->displayName,'order'=>$length--];
        }


    }
   
    $result=Arrays::sort($result,function($item){
            return $item["order"];});
    /*$result=Arrays::each($result, function($value) {
                    return $value["col"];
                });*/

    return $result;
   
}

function NormalizeData($schema,$data,$selections){

    

    $d= Arrays::each($data,function($item)use(&$schema,$selections){

        $record=(array)$item;


        Arrays::each($schema->columnsMetaData,function($meta)use(&$record,$selections){

            $selectionPrimaryField='value';

            if ($meta->selection){
               
                    $data=$record[$meta->selection->reference];
                    
                    $selection=$selections[$meta->columnName];


                    if (isset($meta->selection->selectionFields))
                        $selectionPrimaryField=$meta->selection->selectionFields->value;
                   

                    $selection=Arrays::find($selection,function($value)use($data,$selectionPrimaryField){
                                    $rvalue=(array)$value;
                                    return $rvalue[$selectionPrimaryField]==$data;
                              });
                    

                    $selection=(array)$selection;
                    
                    if ($selection){
                        if ($meta->selection->selectionFields)
                        {
                            $fields=$meta->selection->selectionFields;
                            $selection=[
                                "value"=>$selection[$fields->value],
                                "caption"=>$selection[$fields->caption]
                            ];
                        };
                        $record[$meta->columnName]=$selection["caption"];
                    }
                    else{
                        
                        $record[$meta->columnName]="-";
                        
                    }
                
            }
        });
        
        return $record;
    });
    
    return $d;
}

function intializeSelectionOptions($columnsMetaData){
    $selections=[]; // Store selections collection name
    if (!$columnsMetaData) return ;

    // request les selection options and assign the selections name
    Arrays::each($columnsMetaData,function($column)use(&$selections){
      
        if (is_null($column->selection))return $column;

        switch ($column->selection->optionsType) {
        case 'url':
            $request = Request::create($column->selection->options);
            $response = Route::dispatch($request);
            $response=$response->getData();
            //var_dump($response->data);

            $selections[$column->columnName]=$response->data;
            break;
        default:
            
            break;

        };
         
         
    });

   
  


    return $selections;

}

class PrintList extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $schema;
    protected $urlOptions;
    protected $sourceUrl;

    protected $columns=[];
    protected $data=[];
    protected $selections=[];
    protected $columnsMeta=[];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data,$schema,$urlOptions)
    {
    
        $this->schema=json_decode(Storage::disk('list')->get($schema));
        //var_dump(  json_decode(Storage::disk('list')->get($schema)));
        $sourceUrl=urlFormat($this->schema->source,$urlOptions);

        $this->sourceUrl=$sourceUrl;
        $this->data=$data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /* get the column by sorting*/
        $this->columns=sortByOrder($this->schema->columns,
                            $this->schema->columnsMetaData);

        /*getting selection */
        $this->selections=intializeSelectionOptions($this->schema->columnsMetaData);



        /*get the data*/
        /*
        $request = Request::create($this->sourceUrl);
       

        $response = Route::dispatch($request);
         var_dump($response);       

        $response=$response->getData();

        $data=$response->data;*/

        $data=$this->data->toArray()['data'];

        //var_dump($data);

        $this->data=NormalizeData($this->schema,$data,$this->selections);
        //var_dump($this->data);
        $pdf = PDF::loadView('list/Listprint', ['columns' => $this->columns,
                                                'title' =>$this->schema->title,
                                                'data'   =>$this->data]);
        $path  = Storage::disk('list')->getDriver()->getAdapter()->getPathPrefix();
        $path=$path.'w2/'.$this->schema->name.'.pdf';

       
        $pdf->save($path,true);
        //var_dump($pdf->output());


        
    }
}
