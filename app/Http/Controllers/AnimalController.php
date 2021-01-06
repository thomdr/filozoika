<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Animal;
use App\Stay;
use App\SAL;
use App\AVL;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return App\Animal
     */
    public function index()
    {
        return Animal::select(
            'owners.*',
            'owners.name AS owner_name',
            'owners.id AS owner_id',
            'species.*',
            'species.name AS species_name',
            'species.id AS species_id',
            'animals.*'
        )
            ->leftJoin('owners', 'owners.id', '=', 'animals.owner_id')
            ->leftJoin('species', 'species.id', '=', 'animals.species_id')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $data = $request->all();
        // Images
        $id = Animal::getNextId();
        $pasport = $request->hasFile('pasport') && $request->pasport->isValid() ? $request->pasport->storeAs(
            'public',
            $id.'_pasport_'.date('d_m_Y-H_i_s').'.'.$request->pasport->extension()
        ) : null;
        $photo = $request->hasFile('photo') && $request->photo->isValid() ? $request->photo->storeAs(
            'public',
            $id.'_photo_'.date('d_m_Y-H_i_s').'.'.$request->photo->extension()
        ) : null;
        // Creating
        $data['pasport'] = empty($request->pasport) || $request->pasport == 'undefined' ? null : $pasport;
        $data['photo'] = empty($request->photo) || $request->pasport == 'undefined' ? null : $photo;
        Animal::create($data);
        // Create vegetable links
        foreach ($data as $name => $value) {
            if (strpos($name, 'vegetable') !== false && $value == 1) {
                AVL::create(['vegetable_id' => substr($name, 10), 'animal_id' => $id]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return App\Animal
     */
    public function show($id)
    {
        $animal = Animal::select(
            'owners.*',
            'owners.name AS owner_name',
            'owners.id AS owner_id',
            'species.*',
            'species.name AS species_name',
            'species.id AS species_id',
            'animals.*'
        )
            ->leftJoin('owners', 'owners.id', '=', 'animals.owner_id')
            ->leftJoin('species', 'species.id', '=', 'animals.species_id')
            ->where('animals.id', $id)
            ->first();
        $vegetables = AVL::select('vegetables.name', 'vegetables.id')
            ->join('vegetables', 'vegetables.id', '=', 'animal_vegetable_link.vegetable_id')
            ->where('animal_vegetable_link.animal_id', $id)
            ->get();
        $v = [];
        foreach ($vegetables as $vegetable) {
            $animal->{'vegetable_'. $vegetable->id } = 1;
            $v[] = $vegetable->name;
        }
        $animal->vegetables = $v;



        // $stay = Stay::select(
        //     'owners.*',
        //     'owners.name AS owner_name',
        //     'owners.id AS owner_id',
        //     'stays.*'
        // )
        //     ->leftJoin('owners', 'owners.id', '=', 'stays.owner_id')
        //     ->where('stays.id', $id)
        //     ->first();
        // Get links
        $animal->stays = Stay::select(
            'stays.*'
        )
            ->rightJoin('stay_animal_link', 'stays.id', '=', 'stay_animal_link.stay_id')
            ->where('stay_animal_link.animal_id', $id)
            ->get();




        // $animal->stays = SAL::where('animal_id', $id)->get();


        
        return $animal;
    }

    /**
     * Get the specified resource for editing
     *
     * @param  int  $id
     */
    public function edit($id)
    {
        return $this->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        // Delete previous vegetable links
        AVL::where('animal_id', $id)->delete();
        // Create vegetable links
        foreach ($data as $name => $value) {
            if (strpos($name, 'vegetable') !== false) {
                if ($value == 1) {
                    AVL::create(['vegetable_id' => substr($name, 10), 'animal_id' => $id]);
                }
                // Remove vegetable values from data, because it would crash otherwise
                unset($data[$name]);
            }
        }
        // Images & Pasports have to be unset if not updated
        if (empty($request->pasport) || $request->pasport == 'undefined') {
            unset($data['pasport']);
        } else {
            $data['pasport'] = $request->hasFile('pasport') && $request->pasport->isValid() ? $request->pasport->storeAs(
                'public',
                $id.'_pasport_'.date('d_m_Y-H_i_s').'.'.$request->pasport->extension()
            ) : null;
        }
        if (empty($request->photo) || $request->photo == 'undefined') {
            unset($data['photo']);
        } else {
            $data['photo'] = $request->hasFile('photo') && $request->photo->isValid() ? $request->photo->storeAs(
                'public',
                $id.'_photo_'.date('d_m_Y-H_i_s').'.'.$request->photo->extension()
            ) : null;
        }
        unset($data['_method']);
        // Updating
        Animal::where('id', $id)->update($data);
    }

    /**
     * Change the specified resource in storage to show as deleted.
     *
     * @param  int  $id
     */
    public function destroy($id)
    {
        Animal::destroy($id);
    }
}
