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

    public function last()
    {
        $lastElement = Cimke::orderBy('id', 'desc')->first();  
        return $lastElement; 
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
    public function update(Request $request, $id)
    {
        $tag = Cimke::find($id);
        $tag->cim = $request->cim;
        $tag->szoveg = $request->szoveg;
        $tag->hatterszin = $request->hatterszin;
        $tag->betuszin = $request->betuszin;
        $tag->betustilus = $request->betustilus;
        $tag->betutipus = $request->betutipus;
        $tag->betumeret = $request->betumeret;
        $tag->akciosarFt = $request->akciosarFt;
        $tag->akciosarSzazalek = $request->akciosarSzazalek;
        $tag->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cimke $cimke, $id)
    {
        $cimke = Cimke::find($id);
        $cimke->delete();
    }

   
}
