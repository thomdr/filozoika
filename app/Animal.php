<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Animal extends Model
{
    protected $fillable = [
        'name', 'species_id', 'gender', 'date_of_birth', 'vet', 'own_food', 'food_amount', 'owner_id', 'pasport', 'photo', 'information', 'active'
    ];
    
    /**
     * Get the ID of the entry that will be inserted next
     */
    public static function getNextId()
    {
        return (DB::select("show table status like 'animals'"))[0]->Auto_increment;
    }
    
    /**
     * Get the owner of the animal
     */
    public function owner()
    {
        return $this->belongsTo('App\Owner');
    }
}
