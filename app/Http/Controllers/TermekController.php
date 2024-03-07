<?php

namespace App\Http\Controllers;

use App\Models\Termek;
use App\Models\Kepek;
use Illuminate\Http\Request;
use Illuminate\Http\MultipartFormRequest;
use Illuminate\Http\MultipartFormResource;

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
        
        if ($request->hasFile('file')) {
            $files = $request->file('file'); 
            $file_name = $files->getClientOriginalName();
            

            if (Kepek::where('kepNev', 'LIKE', $file_name)->exists()){
                $exist_image = Kepek::where('kepNev', 'LIKE', $file_name)->get();
                return response()->json(array('message' => 'Van már ilyen nevű fotónk!: '.$exist_image[0]->kepNev.' Kérjük, hogy feltöltés előtt nevezze át vagy válasszon másikat!', 'error' => 422)); 

            } else {
                $imgUrl = '../public/img/uploads/'.$file_name;
                $form_data = json_decode($request->form_data);
                $product = Termek::create([
                    'nevHu'=> $form_data->nev,
                    'szin'=> $form_data->szin,
                    'ar'=> $form_data->ar,
                    'leirasHu' =>$form_data->leiras,
                    'keszlet'=> $form_data->keszlet,
                    'img'=> $imgUrl
                ]);
                $productId = $product->id;

                $media = new Kepek;

                $files->storeAs('img/uploads/', $file_name);
                $media->kepNev = $file_name;
                $media->kepLeiras = $file_name;
                $media->kepUtvonal = '../public/img/uploads/'.$file_name;
                $media->uzletId = 1;
                $media->termekId = $productId;
                $media->save();
                $media->id;
                return response()->json(array('message' => 'Sikeres feltöltés!', 'last_insert_id'=> $media->id, 'kepUtvonal'=>$media->kepUtvonal, 'kepNev'=>$media->kepNev, 'kepLeiras'=>$media->kepLeiras),200);
                }
            }
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
