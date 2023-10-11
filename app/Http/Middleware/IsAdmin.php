<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user() &&  Auth::user()->admin == 1) {
        return $next($request);
        redirect('dolgozoi');
        }
        return redirect('/')->with('hiba','Sajnáljuk, a felület eléréséhez nincs jogosultsága. Kérjük jelentkezzen be admin joggal rendelkező felhasználói fiókkal!');
    }
}
