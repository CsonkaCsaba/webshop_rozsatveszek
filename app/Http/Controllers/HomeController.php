<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Karbantartas;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth','verified']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Karbantartas $karbantartas)
    {
        if(Auth::id()){
            $usertype = Auth()->user()->admin;
            if($usertype == 1){
                return view('/dolgozoi');
            } else if ($usertype == null && $karbantartas == false){
                return view('welcome');
            } else if ($usertype == null && $karbantartas == true){
                Auth::logout();
                //Session::flush();
                return redirect()->back()->with(['msg' => 'Sajnáljuk, karbantartás alatt csak a dolgozói jogosultsággal rendelkező felhasználók léphetnek be!']);
            }else {
                return redirect()->back();
            }
        }
    }

    public function adminHome()
    {
        
        
       
    }
}
