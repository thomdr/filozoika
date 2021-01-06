<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cage;
use App\Stay;
use App\CSL;

class CageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return App\Animal
     */
    public function index()
    {
        $cages = Cage::orderBy('number', 'asc')->get();
        foreach ($cages as $cage) {
            // Get species
            $species = CSL::select('species.name', 'species.id')
                ->join('species', 'species.id', '=', 'cage_species_link_.species_id')
                ->where('cage_species_link_.cage_id', $cage->id)
                ->get();
            $v = [];
            $w = [];
            foreach ($species as $spec) {
                // $cage->{'species_'. $spec->id } = 1; I don't know what this even did so I commented it out :|
                $v[] = $spec->name;
                $w[] = $spec->id;
            }
            $cage->species = $v;
            $cage->speciesIds = $w;
        }
        return $cages;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $id = Cage::getNextId();
        Cage::create($request->all());
        // Create species links
        foreach ($data as $name => $value) {
            if (strpos($name, 'species') !== false && $value == 1) {
                CSL::create(['species_id' => substr($name, 8), 'cage_id' => $id]);
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
        $cage = Cage::find($id);
        $species = CSL::select('species.name', 'species.id')
            ->join('species', 'species.id', '=', 'cage_species_link_.species_id')
            ->where('cage_species_link_.cage_id', $id)
            ->get();
        $v = [];
        foreach ($species as $spec) {
            $cage->{'species_'. $spec->id } = 1;
            $v[] = $spec->name;
        }
        $cage->species = $v;
        return $cage;
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
        Cage::where('id', $id)->update($request->only(['name', 'number', 'inside']));
        
        $data = $request->all();
        // Delete previous species links
        CSL::where('cage_id', $id)->delete();
        // Create species links
        foreach ($data as $name => $value) {
            if (strpos($name, 'species') !== false) {
                if ($value == 1) {
                    CSL::create(['species_id' => substr($name, 8), 'cage_id' => $id]);
                }
            }
        }
    }

    /**
     * Change the specified resource in storage to show as deleted.
     *
     * @param  int  $id
     */
    public function destroy($id)
    {
        Cage::destroy($id);
    }
}
