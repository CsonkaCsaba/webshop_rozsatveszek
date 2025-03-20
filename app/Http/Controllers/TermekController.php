<?php

namespace App\Http\Controllers;

use App\Models\Termek;
use App\Models\Kepek;
use App\Models\TermekGaleria;
use Illuminate\Http\Request;
use Illuminate\Http\MultipartFormRequest;
use Illuminate\Http\MultipartFormResource;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
class TermekController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __invoke(Request $request)
    {
        $termekek = Termek::query()
        ->with(['cimke'])
        ->with(['galeria'])
        ->get();
        return response()->json($termekek);
    }

    public function index()
    {
        $termekek = Termek::query()
        ->with(['cimke'])
        ->with(['galeria'])->get();
        return response()->json($termekek);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
     

        if ($request->hasFile('file')) {
            $file = $request->file('file'); 
            $file_name = pathinfo($file->getClientOriginalName(), \PATHINFO_FILENAME);
            

            if (Kepek::where('kepNev', 'LIKE', $file_name)->exists()){
                $exist_image = Kepek::where('kepNev', 'LIKE', $file_name)->get();
                return response()->json(array('message' => 'Van már ilyen nevű fotónk!: '.$exist_image[0]->kepNev.' Kérjük, hogy feltöltés előtt nevezze át vagy válasszon másikat!', 'error' => 422)); 

            } else {
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file);
                $image->resize(1280, 710);
                $encoded = $image->toWebp(60)->save('img/uploads/'.$file_name.'.webp');




                $imgUrl = '../public/img/uploads/'.$file_name.'.webp';
                $form_data = json_decode($request->form_data);
                $product = Termek::create([
                    'nevHu'=> $form_data->nev,
                    'nevEn'=> $form_data->nev,
                    'szin'=> $form_data->szin,
                    'egyseg'=> $form_data->egyseg,
                    'cikkszam'=> $form_data->cikkszam,
                    'ar'=> $form_data->ar,
                    'akciosar'=> $form_data->akciosar,
                    'leirasHu' =>$form_data->leiras,
                    'keszlet'=> $form_data->keszlet,
                    'img'=> $imgUrl,
                    'tagline'=> $form_data->tagline,
                ]);
                $productId = $product->id;

                $media = new Kepek;

                //$file->storeAs('img/uploads/', $file_name);
                $media->kepNev = $file_name;
                $media->kepLeiras = $file_name;
                $media->kepUtvonal = '../public/img/uploads/'.$file_name.'.webp';
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

    public function updateCimke(Request $request, $id)
    {
        $product = Termek::find($id);
        $product->cimkeId = $request->cimkeId;
        $product->akciosar = $request->akciosar;
        $product->save();
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
                $product->egyseg = $request->egyseg;
                $product->cikkszam = $request->cikkszam;
                $product->ar = $request->ar;
                $product->akciosar = $request->akciosar;
                $product->leirasHu = $request->leirasHu;
                $product->keszlet = $request->keszlet;
                $product->tagline = $request->tagline;
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

public function updateimage(Request $request)
{
    if ($request->hasFile('file')) {
        $file = $request->file('file');
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);
       
        $file_name = pathinfo($file->getClientOriginalName(), \PATHINFO_FILENAME);
            if (Kepek::where('kepNev', 'LIKE', $file_name)->exists()){
                $exist_image = Kepek::where('kepNev', 'LIKE', $file_name)->get();
                return response()->json(array('message' => 'Van már ilyen nevű fotónk!: '.$exist_image[0]->kepNev.' Kérjük, hogy feltöltés előtt nevezd át vagy válasszon másikat!', 'error' => 422)); 
            } else {

            $manager = new ImageManager(new Driver());
            $image = $manager->read($file);
            $image->resize(1280, 710);
            $encoded = $image->toWebp(60)->save('img/uploads/'.$file_name.'.webp');



            $media = new Kepek;
            //$file->storeAs('img/uploads/', $file_name);
            $media->kepNev = $file_name;
            $media->kepLeiras = $file_name;
            $media->kepUtvonal = '../public/img/uploads/'.$file_name.'.webp';
            $media->uzletId = 1;
            $media->save();

            $form_data = json_decode($request->form_data);
            $id = $form_data->id;        
            $product = Termek::find($id);
            $imgUrl = '../public/img/uploads/'.$file_name.'.webp';
            $product->img = $imgUrl;
            $product->save();
            return response()->json(array('message' => 'Sikeres feltöltés!', 'kepUtvonal'=>$imgUrl),200);
            }
    } else {

        $id = $request->id;
        $imgUrl = $request->img;
        $product = Termek::find($id);
        $product->img = $imgUrl;
        $product->save();
        return response()->json(array('message' => 'Sikeres feltöltés!', 'kepUtvonal'=>$imgUrl),200);
    }
}

    public function addImageToGallery(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $request->validate([
                'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]);
           
            $file_name = pathinfo($file->getClientOriginalName(), \PATHINFO_FILENAME);
                if (TermekGaleria::where('kepNev', 'LIKE', $file_name)->exists()){
                    $exist_image = TermekGaleria::where('kepNev', 'LIKE', $file_name)->get();
                    return response()->json(array('message' => 'Van már ilyen nevű fotónk!: '.$exist_image[0]->kepNev.' Kérjük, hogy feltöltés előtt nevezd át vagy válasszon másikat!', 'error' => 422)); 
                } else {
    
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file);
                $image->resize(1280, 710);
                $encoded = $image->toWebp(60)->save('img/uploads/'.$file_name.'.webp');
                    
                $form_data = json_decode($request->form_data);
                $id = $form_data->id; 
                $imgUrl = '../public/img/uploads/'.$file_name.'.webp';
                $media = new TermekGaleria;
                $media->kepNev = $file_name;
                $media->kepLeiras = $file_name;
                $media->kepUtvonal = $imgUrl;
                $media->termekid = $id;
                $media->save();
                $lastId = $media->id;     
                return response()->json(array('message' => 'Sikeres feltöltés!', 'kepUtvonal'=>$imgUrl, 'id' => $lastId, 'kepLeiras' => $file_name, 'kepNev' => $file_name, 'termekid' => $id),200);
                }
        } 

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hirek = Termek::find($id);
        $hirek->delete();
    }

    public function removeImageFromGallery($id)
    {
        $galeriafoto = TermekGaleria::find($id);
        $galeriafoto->delete();
    }

    
}
