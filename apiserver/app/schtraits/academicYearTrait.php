<?php

namespace App\schtraits;

use Illuminate\Support\Facades\Auth;
use ResourceServer;
use App\Lib\Tenant\TenantAuth;

 trait AcademicYearTrait {

    /**
     * Boot the Active Events trait for a model.
     *
     * @return void
     */
    public static function bootAcademicYearTrait()
    {

    

        static::addGlobalScope(new AcademicYearScope);

    }


	/**
	 * Get the name of the column for applying the scope.
	 *
	 * @return string
	 */
	public function getAcYearIdColumn()
	{
		return defined('static::ACYEAR_ID_COLUMN') ? static::ACYEAR_ID_COLUMN : 'acyearId';
	}
	/**
	 * Get the fully qualified column name for applying the scope.
	 *
	 * @return string
	 */
	public function getQualifiedAcYearIdColumn()
	{
		return $this->getTable().'.'.$this->getAcYearIdColumn();
	}
	/**
	 * Get the query builder without the scope applied.
	 *
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
	public static function withDrafts()
	{
		return with(new static)->newQueryWithoutScope(new AcdemicYearScope);
	}

	 public function setAcyearAttributes(array $attributes = []){

        $this->attributes['acyearId']=TenantAuth::currentAcademicYear();
      }

     /**
     * Save a new model and return the instance.
     *
     * @param  array  $attributes
     * @return static
     */
    public static function create(array $attributes = [])
    {
    	//var_dump(\Authorizer::getResourceOwnerId());
    	//var_dump(Authorizer::getOwnerType( ));//
    	if (TenantAuth::check())
    	{
    		
    		$attributes['acyearId']=TenantAuth::currentAcademicYear();
    	}

	    return parent::create($attributes);
    }


}

?>
