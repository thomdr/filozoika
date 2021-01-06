<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CSL extends Model
{
    protected $table = 'cage_species_link_';
    protected $fillable = ['cage_id', 'species_id'];
}
