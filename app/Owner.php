<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Owner extends Model
{
    protected $fillable = [
        'name', 'email', 'residence', 'address', 'postal_code', 'phone_1', 'phone_2', 'phone_3', 'information', 'deleted'
    ];
    
    /**
     * Get the ID of the entry that will be inserted next
     */
    public static function getNextId()
    {
        return (DB::select("show table status like 'owners'"))[0]->Auto_increment;
    }

    /**
     * Get the animals of the owner
     */
    public function animals()
    {
        return $this->hasMany('App\Animal');
    }
}
