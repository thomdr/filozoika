<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Cage extends Model
{
    protected $fillable = [ 'number', 'name', 'inside'];
    
    /**
     * Get the ID of the entry that will be inserted next
     */
    public static function getNextId()
    {
        return (DB::select("show table status like 'cages'"))[0]->Auto_increment;
    }
}
