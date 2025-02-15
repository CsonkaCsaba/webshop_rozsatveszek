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
                    'nevEn'=> $form_data->nev,
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
                return response()->json(array('message' => 'Sikeres feltöltés!', 'last_insert_id'=> $media->id, 'kepUtvonal'=>$media->kepUtvonal, 'kepNev'=>$media->kepNev, 'kepLeiras'=>$media->kepLeiras, 'product_Id' =>$productId),200);
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
    public function update(Request $request, $id)
    {
        // $file = $request->file('upload_file');
        // if($file !== "" || $file !== null){
        // return response()->json(array('message' => $file['name']));
        // }else{
        // return response()->json(array('message' => 'NINCS!'));
        // }

        
        // if ($request->hasFile('upload_file')) {
        //     return response()->json(array('message' => 'VAN!'));
            // $files = $request->file('file'); 
            // $file_name = $files->getClientOriginalName();
            
            // if (Kepek::where('kepNev', 'LIKE', $file_name)->exists()){
            //     $exist_image = Kepek::where('kepNev', 'LIKE', $file_name)->get();
            //     return response()->json(array('message' => 'Van már ilyen nevű fotónk!: '.$exist_image[0]->kepNev.' Kérjük, hogy feltöltés előtt nevezze át vagy válasszon másikat!', 'error' => 422)); 

            // } else {
                // $form_data = json_decode($request->formData_update);
                $product = Termek::find($id);
                // $imgUrl = '../public/img/uploads/'.$file_name;
                $product->nevHu = $request->nevHu;
                $product->nevEn = $request->nevHu;
                $product->szin = $request->szin;
                $product->ar = $request->ar;
                $product->leirasHu = $request->leirasHu;
                $product->keszlet = $request->keszlet;
                // $product->img = $imgUrl;
                $product->save();
                // $productId = $product->id;

            //     $media = new Kepek;

            //     $files->storeAs('img/uploads/', $file_name);
            //     $media->kepNev = $file_name;
            //     $media->kepLeiras = $file_name;
            //     $media->kepUtvonal = '../public/img/uploads/'.$file_name;
            //     $media->uzletId = 1;
            //     $media->termekId = $productId;
            //     $media->save();
            //     $media->id;
            //         return response()->json(array('message' => 'Sikeres feltöltés!', 'last_insert_id'=> $media->id, 'kepUtvonal'=>$media->kepUtvonal, 'kepNev'=>$media->kepNev, 'kepLeiras'=>$media->kepLeiras, 'product_Id' =>$productId),200);
            //         }
            // } else {
            //     return response()->json(array('message' => 'NINCS!'));
                // $id = $request['id'];
                // $product = Termek::find($id);
                // $product->nevHu = $request->nev;
                // $product->nevEn = $request->nev;
                // $product->szin = $request->szin;
                // $product->ar = $request->ar;
                // $product->leirasHu = $request->leiras;
                // $product->keszlet = $request->keszlet;
                // $product->save();
            // }
}
public function updateQuantity(Request $request, $id)
    {
        $product = Termek::find($id);
        $mennyiseg = $request->mennyiseg;
        $product->keszlet = $product->keszlet + $mennyiseg;
        $product->save();

}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hirek = Termek::find($id);
        $hirek->delete();
    }
}
