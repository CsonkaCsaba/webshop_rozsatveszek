<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use Illuminate\Http\Request;

class KategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __invoke(Request $request)
    {
        return Kategoria::all();
    }

    public function index()
    {
        $kategoriak = Kategoria::all();
        return response()->json($kategoriak);
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
    public function show(Kategoria $kategoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategoria $kategoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategoria $kategoria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategoria $kategoria)
    {
        //
    }
}
