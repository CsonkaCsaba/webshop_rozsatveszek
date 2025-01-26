<?php

namespace App\Http\Controllers;

use App\Models\Karbantartas;
use Illuminate\Http\Request;

class KarbantartasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Karbantartas::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(karbantartas $karbantartas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(karbantartas $karbantartas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, karbantartas $karbantartas, $id)
    {
        $karbantartas = Karbantartas::find($id);
        $karbantartas->aktiv = $request->aktiv;
        $karbantartas->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(karbantartas $karbantartas)
    {
        //
    }
}
