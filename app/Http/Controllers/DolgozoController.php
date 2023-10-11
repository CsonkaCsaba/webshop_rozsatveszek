<?php

namespace App\Http\Controllers;

use App\Models\Dolgozo;
use Illuminate\Http\Request;

class DolgozoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(Request $request)
    {
        return Dolgozo::all();
    }

    public function index()
    {

      
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
    public function show(Dolgozo $dolgozo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dolgozo $dolgozo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dolgozo $dolgozo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dolgozo $dolgozo)
    {
        //
    }
}
