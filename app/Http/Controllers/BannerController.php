<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Banner::all();
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
    public function show(banner $banner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(banner $banner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, banner $banner, $id)
    {
        $banner = Banner::find($id);
        $banner->szoveg = $request->szoveg;
        $banner->hatterszin = $request->hatterszin;
        $banner->betuszin = $request->betuszin;
        $banner->aktiv = $request->aktiv;
        $banner->sebesseg = $request->sebesseg;
        $banner->betutipus = $request->betutipus;
        $banner->betustilus = $request->betustilus;
        $banner->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(banner $banner)
    {
        //
    }
}
