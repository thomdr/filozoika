<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AVL extends Model
{
    protected $table = 'animal_vegetable_link';
    protected $fillable = ['animal_id', 'vegetable_id'];
}
