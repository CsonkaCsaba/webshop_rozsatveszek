<?php

namespace App\Http\Controllers;

use App\Models\Cime;
use Illuminate\Http\Request;

class CimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cime::all();
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
    public function show(Cime $cime)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cime $cime)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cime $cime)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cime $cime)
    {
        //
    }
}
