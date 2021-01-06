<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SAL extends Model
{
    protected $table = 'stay_animal_link';
    protected $fillable = ['cage_id', 'animal_id', 'medication', 'nails', 'stay_id'];
}
