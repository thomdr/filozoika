<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Species extends Model
{
    protected $table = 'species';
    protected $fillable = ['name'];
}
