<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Status;

class StatusController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $status = Status::create([
            'stay_animal_link_id' => $request->id,
            'peed' => $request->peed,
            'pood' => $request->pood,
            'fed' => $request->fed,
            'information' => $request->information,
            'date' => date('Y-m-d'),
            'time' => date('H:i:s')
        ]);
        return $status;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Status::where('id', $id)->update($request->only(['fed', 'peed', 'pood', 'information']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Status::destroy($id);
    }
}
