<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;

use App\Http\Requests;
use DB;


 trait FilterTrait {

 	protected $_filterFields=[];
 	public $RawFilterFields=[];

 	public function setfiterFields($fields){

 		$this->_filterFields=$fields;

 	}

 	public   function ApplyFilters($query,$paginate){
        
        $args=Request::all();
        $filters=[];
        $sort=null;
        $simplefilter='';
        $captionField='';
        $recordsPerPage=15;
        if ($this->filterFields)
        	$this->_filterFields=array_merge($this->_filterFields,$this->filterFields);

        $advancedQuery=false;

        foreach ($args as $arg => $value) {
        	switch($arg){
        		case 'sort_by':
        			$sort=$value;
        			break;
        		case 'order':
        			$order=$value;
        			break;
        		case 'query':
        			$simplefilter=$value;
        			break;
        		case 'c_f':
        			$captionField=$value;
        			break;
        		case 'limit':
        			$recordsPerPage=is_numeric($value)?$value:$recordsPerPage;

        		default:
        			//TODO: change to walk filterFieldAlias(array)
        			$seach=array_where($this->_filterFields,function($key,$value) use($arg){
        				return is_array($key)?($key[0]==arg):($key==$arg);
        
        			});
        		
        			/*if (in_array($arg, $this->_filterFields)){
        				$filters[$arg]=$value;
        				$advancedQuery=true;
        			}
        			break;*/

        	}
        };
        

 		/*$sort=Request::get('sort_by');
 		$order=Request::get('order') ?: 'ASC';
 		$simplefilter=Request::get('query');
 		$fields=Request::get('field');
*/
 		


 		if ($captionField){

 			$query=$query->select("$captionField as caption",$query->getKeyName().' as value');
 		}
 		if ($sort)
 		{
 			$query=$query->orderBy($sort,$order);
 		};

 		
 		if (($simplefilter>'') || ($advancedQuery)){


 			if ($advancedQuery==false){
 				$filterFields=$this->_filterFields;
 				$query->where(function($query) use($filterFields,$simplefilter){
						foreach ($filterFields as $filterField) {

							if (is_array($filterField)){
								$query=$query->orWhere(DB::raw($filterField[1]),'LIKE',"%$simplefilter%");

							}
							else
			 				if ($filterField[0]=='#'){
			 					$field=substr($filterField, 1);
			 					$query=$query->havingRaw($field.'='."$simplefilter");
			 				}
			 				else{
			 					$query=$query->orWhere($filterField,'LIKE',"%$simplefilter%");
			 				}


			 			
			 			};
 				});

	 		
	 		}
	 		else{

	 			$query->where(function($query) use ($filter){
					foreach ($filters as $key=>$value) {
		 				if ($key[0]=='#'){
		 					$field=substr($key, 1);
		 					$query=$query->having($field,'LIKE',"%$value%");
		 				}
		 				else{
		 					$query=$query->orWhere($key,'LIKE',"%$value%");
		 				}
	 				};
	 			});

	 			

	 		};
	 	};
	 	//echo ($query->toSql());

 		if ($paginate)
 			return $query->paginate($recordsPerPage);
 		else
 			return $query->get();



 	}



 }



?>
