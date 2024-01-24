<?php

namespace App\Http\Controllers;

use App\Models\Hirek;
use App\Models\Kepek;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HirekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(Request $request)
    {
        return Hirek::all();
    }

    public function index()
    {
        $news = Hirek::with('photo')->get();;
        
        return view('dolgozoi', [
            'news' => $news
        ]);
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
    public function show(Hirek $hirek)
    {
        $news = Hirek::all();

    
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hirek $hirek)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $hirek = Hirek::find($id);
        $hirek->uzletId = $request->uzletId;
        $hirek->leiras = $request->leiras;
        $hirek->cim = $request->cim;
        $hirek->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hirek = Hirek::find($id);
        $hirek->delete();
    }
}
