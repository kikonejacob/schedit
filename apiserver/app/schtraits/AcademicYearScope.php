<?php

namespace App\Schtraits;

use Illuminate\Database\Query\Builder as BaseBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use App\Lib\Tenant\TenantAuth;

class AcademicYearScope implements Scope
{

    protected $extensions = ['WithAllAcyears'];
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {


      if (TenantAuth::check())
       {
            $column=$model->getQualifiedAcYearIdColumn();
            $builder->where($column,'=',TenantAuth::currentAcademicYear());
           // $this->extend($builder,$model);
      }
    }




    /**
     * Remove the scope from the given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function remove(Builder $builder, Model $model)
    {
        $column = $model->getQualifiedAcYearIdColumn();

        $query = $builder->getQuery();



        $query->wheres = collect($query->wheres)->reject(function ($where) use ($column) {
            return $this->isAcYearConstraint($where, $column);
        })->values()->all();
    }

    /**
     * Extend the query builder with the needed functions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    /*
    public function extend(Builder $builder,$model)
    {
        foreach ($this->extensions as $extension) {
            $this->{"add{$extension}"}($builder);
        }
echo 'ffdf  ';

        $model->saving(function ($Model) {


            $Model->setAcyearAttributes();
            return true;
        });

    }*/

    /**
     * Get the "deleted at" column for the builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return string
     */
    protected function getAcYearIdColumn(Builder $builder)
    {
        if (count($builder->getQuery()->joins) > 0) {
            return $builder->getModel()->getQualifiedAcYearIdColumn();
        } else {
            return $builder->getModel()->getAcYearIdColumn();
        }
    }

    /**
     * Add the WithAllAcyears extension to the builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    protected function addWithAllAcyears(Builder $builder)
    {
        $builder->macro('WithAllAcyears', function (Builder $builder) {
            $this->remove($builder, $builder->getModel());

            return $builder;
        });
    }


    /**
     * Determine if the given where clause is a soft delete constraint.
     *
     * @param  array   $where
     * @param  string  $column
     * @return bool
     */
    protected function isAcYearConstraint(array $where, $column)
    {
        return $where['type'] == 'basic' && $where['column'] == $column;
    }
}


?>
