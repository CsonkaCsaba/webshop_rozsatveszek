<?php

namespace App\Http\Controllers;

use App\Models\Uzlet;
use Illuminate\Http\Request;

class UzletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(Request $request)
    {
        return Uzlet::all();
    }

    public function index()
    {
       $posts = Uzlet::limit(1)->get();
       return response()->json($posts);
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


        Uzlet::create([
            'id'=> $request->id,
            'nev'=> $request-> nev,
            'bemutatkozasHu'=> $request-> bemutatkozasHu,
            'bemutatkozasEn'=> $request-> bemutatkozasEn,
            'iranyitoszam'=> $request-> iranyitoszam,
            'telepules'=> $request-> telepules,
            'utca'=> $request-> utca,
            'hazszam'=> $request-> hazszam,
            'tel'=> $request-> tel,
            'email'=> $request-> email,
            'adoszam'=> $request-> adoszam,
        ]);

        return response()->json('created');

    }

    /**
     * Display the specified resource.
     */
    public function show(Uzlet $uzlet)
    {
        return $uzlet;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Uzlet $uzlet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Uzlet $uzlet, $id)
    {
        $uzlet = Uzlet::find($id);

        if($uzlet){

            $uzlet->nev = $request->nev;
            $uzlet->bemutatkozasHu = $request->bemutatkozasHu;
            $uzlet->bemutatkozasEn = $request->bemutatkozasEn;
            $uzlet->iranyitoszam = $request->iranyitoszam;
            $uzlet->telepules = $request->telepules;
            $uzlet->utca = $request->utca;
            $uzlet->hazszam = $request->hazszam;
            $uzlet->tel = $request->tel;
            $uzlet->email = $request->email;
            $uzlet->adoszam = $request->adoszam;


            $uzlet->save();
            return response()->json('updated');
        }

        return response()->json('id not found');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Uzlet $uzlet)
    {
        $uzlet->delete();
        
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
