<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function storeWish(Request $request)
    {
        try{
            $wish = new Wishlist;
            if(Auth::check()){
                $wish->user_id = Auth::id();
                $wish->product_id = $request->id;
                $wish->save();
                return response()->json(array('id' => $request->id));
            }else{
                return response()->json(array('message' => 'user not logged in', 'id' => $request->id));
            }
        
            
        } catch(Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wishlist $wishlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $wish = Wishlist::find($id);
        $wish->product_id = $request->productId;
        $wish->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    
    public function destroy($id)
    {
        if(Auth::check()){
            $wish = Wishlist::where([['user_id',Auth::id()],['product_id',$id]])->first();
            $wish->delete();
        }else{
            return response()->json(array('message' => 'user not logged in', 'id' => $id));
        }
        
    }
}
