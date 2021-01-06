<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Owner;
use App\Animal;
use App\Stay;
use App\SAL;
use App\Species;
use App\Status;

class StayController extends Controller
{
    /**
     * Create links and animals
     *
     * @param array $data Array of data
     * @param integer $ownerId ID of owner
     * @param integer $stayId ID of stay
     * @param boolean $edit If editing
     * @return void
     */
    public function createLinks(array $data, int $ownerId, int $stayId, bool $edit = false):void
    {
        $speciesData = Species::all();
        $_count = 0;
        foreach ($data as $key => $value) {
            // New animals
            if (preg_match('/a_[\d]_amount/', $key)) {
                // For the amount of new animals
                for ($i=0; $i < $value; $i++) {
                    $_count++;
                    $nextId = Animal::getNextId();
                    $count = substr($key, 2, 1);
                    $species = $data['a_'.$count.'_species'];
                    // Get species name
                    foreach ($speciesData as $spec) {
                        if ($spec->id == $species) {
                            $speciesName = $spec->name;
                        }
                    }
                    // Create a new animal
                    Animal::create([
                        'name' => "Onbekend - $speciesName ($_count)",
                        'species_id' => $species,
                        'owner_id' => $ownerId
                    ]);
                    // Create stay_animal link
                    SAL::create([
                        'animal_id' => $nextId,
                        'cage_id' => $data['a_'.$count.'_new_cage'],
                        'stay_id' => $stayId,
                        'medication' => $edit ? $data['a_'.$count.'_new_medic'] : 0,
                        'nails' => $edit ? $data['a_'.$count.'_new_nails'] : 0
                    ]);
                }
                // Existing animals
            } elseif (preg_match('/a_[\d]_id/', $key)) {
                $count = substr($key, 2, 1);
                // Create stay_animal link
                SAL::create([
                    'animal_id' => $value,
                    'cage_id' => $data['a_'.$count.'_old_cage'],
                    'stay_id' => $stayId,
                    'medication' => $edit ? $data['a_'.$count.'_old_medic'] : 0,
                    'nails' => $edit ? $data['a_'.$count.'_old_nails'] : 0
                ]);
            }
        }
    }
    /**
     * Display a listing of the resource based on date.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function today(Request $request)
    {
        $stays = Stay::select(
            'owners.*',
            'owners.name AS owner_name',
            'owners.id AS owner_id',
            'stays.*'
        )
            ->leftJoin('owners', 'owners.id', '=', 'stays.owner_id')
            ->where([
                // ['stays.start_date', '<=', $request->day],
                ['stays.start_date', '<=', date('Y-m-d', strtotime('+7 day', \DateTime::createFromFormat('Y-m-d', $request->day)->getTimestamp()))],
                ['stays.end_date', '>=', $request->day]
            ])
            ->orderBy('stays.end_date', 'ASC')
            ->get();
        // Get links
        foreach ($stays as $stay) {
            $stay->links = SAL::select(
                'animals.*',
                'animals.name AS animal_name',
                'animals.id AS animal_id',
                'cages.*',
                'cages.name AS cage_name',
                'cages.id AS cage_id',
                'species.*',
                'species.name AS species_name',
                'species.id AS species_id',
                'stay_animal_link.*'
            )
                ->leftJoin('animals', 'animals.id', '=', 'stay_animal_link.animal_id')
                ->leftJoin('cages', 'cages.id', '=', 'stay_animal_link.cage_id')
                ->leftJoin('species', 'species.id', '=', 'animals.species_id')
                ->where('stay_animal_link.stay_id', $stay->id)
                ->get();
            $stay->animals = count($stay->links);
            foreach ($stay->links as $link) {
                $link->statuses = Status::where([
                    ['statuses.stay_animal_link_id', '=', $link->id],
                    ['statuses.date', '=', $request->day]
                ])->get();
            }
        }
        return $stays;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stays = Stay::select(
            'owners.*',
            'owners.name AS owner_name',
            'owners.id AS owner_id',
            'stays.*'
        )
            ->leftJoin('owners', 'owners.id', '=', 'stays.owner_id')
            ->get();
        // Get links
        foreach ($stays as $stay) {
            $stay->links = SAL::select(
                'animals.*',
                'animals.name AS animal_name',
                'animals.id AS animal_id',
                'cages.*',
                'cages.name AS cage_name',
                'cages.id AS cage_id',
                'species.*',
                'species.name AS species_name',
                'species.id AS species_id',
                'stay_animal_link.*'
            )
                ->leftJoin('animals', 'animals.id', '=', 'stay_animal_link.animal_id')
                ->leftJoin('cages', 'cages.id', '=', 'stay_animal_link.cage_id')
                ->leftJoin('species', 'species.id', '=', 'animals.species_id')
                ->where('stay_animal_link.stay_id', $stay->id)
                ->get();
            $stay->animals = count($stay->links);
        }
        return $stays;
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $stayId = Stay::getNextId();
        
        // Set owner id, optinally create new owner
        if (isset($request->owner_id_override)) {
            // Existing owner
            $ownerId = $request->owner_id_override;
        } else {
            // New owner
            $ownerId = Owner::getNextId();
            Owner::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'residence' => $data['residence'],
                'address' => $data['address'],
                'postal_code' => $data['postal_code'],
                'phone_1' => $data['phone_1'],
                'phone_2' => $data['phone_2'],
                'phone_3' => $data['phone_3'],
                'information' => $data['information']
            ]);
        }
        // Make stay
        Stay::create([
            'owner_id' => $ownerId,
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'information' => $data['s_information'],
        ]);
        // Make links
        $this->createLinks($data, $ownerId, $stayId);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $stay = Stay::select(
            'owners.*',
            'owners.name AS owner_name',
            'owners.id AS owner_id',
            'stays.*'
        )
            ->leftJoin('owners', 'owners.id', '=', 'stays.owner_id')
            ->where('stays.id', $id)
            ->first();
        // Get links
        $stay->links = SAL::select(
            'animals.*',
            'animals.name AS animal_name',
            'animals.id AS animal_id',
            'cages.*',
            'cages.name AS cage_name',
            'cages.id AS cage_id',
            'species.*',
            'species.name AS species_name',
            'species.id AS species_id',
            'stay_animal_link.*'
        )
            ->leftJoin('animals', 'animals.id', '=', 'stay_animal_link.animal_id')
            ->leftJoin('cages', 'cages.id', '=', 'stay_animal_link.cage_id')
            ->leftJoin('species', 'species.id', '=', 'animals.species_id')
            ->where('stay_animal_link.stay_id', $stay->id)
            ->get();
        $stay->animals = count($stay->links);
        return $stay;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        // Update stay
        Stay::where('id', $id)->update([
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'information' => $data['s_information'],
        ]);
        // Remove existing links
        SAL::where('stay_id', $id)->delete();
        // And remake them
        $this->createLinks($data, $data['owner_id'], $id, true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Stay::destroy($id);
    }
}
