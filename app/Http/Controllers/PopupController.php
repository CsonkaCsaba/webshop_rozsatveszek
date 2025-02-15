<?php

namespace App\Http\Controllers;

use App\Models\Popup;
use Illuminate\Http\Request;

class PopupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Popup::query();

        $popup = $query->with(['photo'])->get();
        return response()->json($popup);
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
    public function show(Popup $popup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Popup $popup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Popup $popup, $id)
    {
        $popup = Popup::find($id);
        $popup->cim = $request->cim;
        $popup->szoveg = $request->szoveg;
        $popup->kepId = $request->kepId;
        $popup->aktiv = $request->aktiv;
        $popup->betuszin = $request->betuszin;
        $popup->hatterszin = $request->hatterszin;
        $popup->fotomutat = $request->fotomutat;
        $popup->betustilus = $request->betustilus;
        $popup->betutipus = $request->betutipus;
        $popup->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Popup $popup)
    {
        //
    }
}
