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
       
    }

    public function index()
    {
        $query = Hirek::query();

        $news = $query->with(['photo'])->get();
        //$newsWithPhoto = Hirek::with('photo');
        return response()->json($news);

        // $news = Hirek::with('photo');
        // return json($news);

        // $news = Hirek::with('photo')->orderBy('id', 'desc')->limit(3)->get();
        
        // return view('welcome', [
        //     'news' => $news
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $todayDate = date("Y-m-d");

       $new = Hirek::create([
            'cim'=> $request->cim,
            'leiras'=> $request-> leiras,
            'datum'=>$todayDate,
            'uzletId'=> $request-> uzletId,
            'kepId'=> $request-> kepId,
            
        ]);

        $lastInsertId = $new->id;


        return response()->json(array('last_id' => $lastInsertId, 'datum' => $todayDate));
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
        $query = Hirek::query();

        $newsall = $query->with(['photo'])->orderBy('id', 'desc')->limit(3)->get();
        //$newsWithPhoto = Hirek::with('photo');
        return response()->json($newsall);

    
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
