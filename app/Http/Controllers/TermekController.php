<?php

namespace App\Http\Controllers;

use App\Models\Termek;
use App\Models\Kepek;
use Illuminate\Http\Request;

class TermekController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __invoke(Request $request)
    {
        return Termek::all();
    }

    public function index()
    {
        $termekek = Termek::all();
        return response()->json($termekek);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        
        app('App\Http\Controllers\KepekController')->upload($request->photo);
        
        // $photo = Kepek::create([

        // ]);
        
        
        $product = Termek::create([
            'nevHu'=> $request->nev,
            'szin'=> $request-> szin,
            'ar'=> $request-> ar,
            'leirasHU' =>$request->leiras,
            'keszlet'=> $request-> keszlet,
            
        ]);

        // $lastInsertId = $product->id;


        // return response()->json(array('last_id' => $lastInsertId));
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
    public function show(Termek $termek)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Termek $termek)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Termek $termek)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Termek $termek)
    {
        //
    }
}
