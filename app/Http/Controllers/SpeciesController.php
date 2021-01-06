<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Species;

class SpeciesController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return App\Owner
     */
    public function index()
    {
        return Species::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        Species::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return App\Owner
     */
    public function show($id)
    {
        return Species::find($id);
    }

    /**
     * Get the specified resource for editing
     *
     * @param  int  $id
     */
    public function edit($id)
    {
        return Species::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     */
    public function update(Request $request, $id)
    {
        Species::where('id', $id)->update($request->only(['name']));
    }

    /**
     * Change the specified resource in storage to show as deleted.
     *
     * @param  int  $id
     */
    public function destroy($id)
    {
        Species::destroy($id);
    }
}
