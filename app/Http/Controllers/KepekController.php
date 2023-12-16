<?php

namespace App\Http\Controllers;

use App\Models\Kepek;
use Illuminate\Http\Request;

class KepekController extends Controller
{
    public function __invoke(Request $request)
    {
        return Kepek::all();
    }

    public function index()
    {
        $gallery = Kepek::all();
        return response()->json($gallery);
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
    public function show(Kepek $kepek)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kepek $kepek)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kepek $kepek)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kepek $kepek)
    {
        //
    }
}
