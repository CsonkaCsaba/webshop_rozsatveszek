<?php

namespace App\Http\Controllers;

use App\Models\Cimke;
use Illuminate\Http\Request;

class CimkeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cimke::all();  
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        

        $new = Cimke::create([
            'cim'=> $request->cim,
            'szoveg'=> $request->szoveg,
            'hatterszin'=> $request->hatterszin,
            'betuszin' => $request->betuszin,
            'betustilus'=> $request->betustilus,
            'betutipus'=> $request->betutipus,
            'betumeret'=> $request->betumeret,
            'akciosarFt'=> $request->akciosarFt,
            'akciosarSzazalek'=> $request->akciosarSzazalek,
         ]);
         $lastInsertId = $new->id;
         return response()->json(array('last_id' => $lastInsertId));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cimke $cimke)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cimke $cimke)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cimke $cimke)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cimke $cimke)
    {
        //
    }
}
