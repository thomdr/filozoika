<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Owner;
use App\Animal;
use App\Stay;

class OwnerController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return App\Owner
     */
    public function index()
    {
        return Owner::where('deleted', '0')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        Owner::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return App\Owner
     */
    public function show($id)
    {
        $owner = Owner::find($id);
        $owner->animals = Animal::select(
            'species.*',
            'species.name AS species_name',
            'species.id AS species_id',
            'animals.*'
        )
            ->leftJoin('species', 'species.id', '=', 'animals.species_id')
            ->where('animals.owner_id', $id)
            ->get();
        $owner->stays = Stay::where('owner_id', $id)->get();
        
        return $owner;
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
        Owner::where('id', $id)->update($request->only([
            'name', 'email', 'residence', 'address', 'postal_code', 'phone_1', 'phone_2', 'phone_3', 'information'
        ]));
    }

    /**
     * Change the specified resource in storage to show as deleted.
     *
     * @param  int  $id
     */
    public function destroy($id)
    {
        Owner::where('id', $id)->update([
            'name' => 'Verwijderd',
            'email' => null,
            'residence' => null,
            'address' => null,
            'postal_code' => null,
            'phone_1' => null,
            'phone_2' => null,
            'phone_3' => null,
            'information' => null,
            'deleted' => 1
        ]);
    }
}
