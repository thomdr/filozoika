<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vegetable;

class VegetableController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return App\Owner
     */
    public function index()
    {
        return Vegetable::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        Vegetable::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return App\Owner
     */
    public function show($id)
    {
        return Vegetable::find($id);
    }

    /**
     * Get the specified resource for editing
     *
     * @param  int  $id
     */
    public function edit($id)
    {
        return Vegetable::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     */
    public function update(Request $request, $id)
    {
        Vegetable::where('id', $id)->update($request->only(['name']));
    }

    /**
     * Change the specified resource in storage to show as deleted.
     *
     * @param  int  $id
     */
    public function destroy($id)
    {
        Vegetable::destroy($id);
    }
}
