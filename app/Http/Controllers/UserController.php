<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Rendeles;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function orders(){
        $orders = Rendeles::where('fk_userId',Auth::id())
        ->with(['termek'])
        ->with(['vasarlo'])
        ->with(['szamlazasiCim'])
        ->with(['szallitasiCim'])
        ->get();
        return $orders;
    }

    public function wishlist(){
        $wishes = Wishlist::where('user_id',Auth::id())
        ->with(['product'])
        ->get();
        return response()->json($wishes);;
    }
}
