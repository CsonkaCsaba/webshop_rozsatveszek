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
        // $image_name = '';
        // $uzletId = 1;
        // if($request->file('image')){
        //     $file = $request->file('image');
        //     $image_name = date('Y-m-d').$file->getClientOriginalName();
        //     $file->move(public_path('images'), $image_name);
        // }
        // Kepek::create([
        //     'kepNev' => $image_name,
        //     'kepLeiras' => $request->kepLeiras,
        //     'uzletId' => $uzletId,
        // ]);
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
    public function update(Request $request, Kepek $kepek, $id)
    {
        $kepek = Kepek::find($id);
        $kepek->uzletId = $request->uzletId;
        $kepek->kepLeiras = $request->kepLeiras;
        $kepek->kepNev = $request->kepNev;
        $kepek->save();
        //$oldPhotoName = $request->oldPhotoName;
        //$file_name = $kepek->kepNev;

        // if(file_exists(public_path('img/uploads/').$oldPhotoName)){
        //     rename(public_path('img/uploads/').$oldPhotoName, public_path('img/uploads/').$file_name);
        //     } else {
        //     dd('A kijelölt fotó nem szerepel a tárhelyen');
        //     }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kepek $kepek, $id)
    {
        $kepek = Kepek::find($id);
        $kepek->delete();

        $file_name = $kepek->kepNev;

        if(file_exists(public_path('img/uploads/').$file_name)){
            unlink(public_path('img/uploads/').$file_name);
            } else {
            return false;//dd('A kijelölt fotó nem szerepel a tárhelyen');
            }

        return true;

    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:jpg,jpeg,png'
        ]);

        $media = new Kepek;

        if($request->file()){
            $file_name = $request->file->getClientOriginalName();
            if(Kepek::where('kepNev', 'LIKE', $file_name)->exists()){
                $exist_image = Kepek::where('kepNev', 'LIKE', $file_name)->get();
                return response()->json(array('message' => 'Van már ilyen nevű fotónk!: '.$exist_image[0]->kepNev.' Kérjük, hogy feltöltés előtt nevezze át vagy válasszon másikat!', 'error' => 422)); 

            } else {
                $request->file('file')->move(public_path('img/uploads/'), $request->file('file')->getClientOriginalName());
                $uzletId = 1;
                $media->kepNev = $file_name;
                $media->kepLeiras = $file_name;
                $media->kepUtvonal = '../public/img/uploads/'.$file_name;
                $media->uzletId = $uzletId;
                $media->save();
                $media->id;
                return response()->json(array('message' => 'Sikeres feltöltés!', 'last_insert_id'=> $media->id, 'kepUtvonal'=>$media->kepUtvonal, 'uzletId'=>$uzletId, 'kepNev'=>$media->kepNev, 'kepLeiras'=>$media->kepLeiras),200);
            }
        }

    }
}
