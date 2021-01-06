<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Stay extends Model
{
    protected $fillable = [
        'owner_id', 'start_date', 'end_date', 'information'
    ];
    
    /**
     * Get the ID of the entry that will be inserted next
     */
    public static function getNextId()
    {
        return (DB::select("show table status like 'stays'"))[0]->Auto_increment;
    }
}
