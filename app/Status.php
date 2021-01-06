<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $table = 'statuses';
    protected $fillable = [
        'stay_animal_link_id', 'date', 'time', 'fed', 'peed', 'pood', 'information'
    ];
    
    /**
     * Get the ID of the entry that will be inserted next
     */
    public static function getNextId()
    {
        return (DB::select("show table status like 'statuses'"))[0]->Auto_increment;
    }
}
