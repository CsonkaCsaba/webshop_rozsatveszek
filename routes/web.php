<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/')->name('welcome');;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/termekek', function () {
    return view('termekek');
});
Route::get('/tanacsok', function () {
    return view('tanacsok');
});
Route::get('/galeria', function () {
    return view('galeria');
});
Route::get('/home', function () {
    return redirect()->route('welcome');;
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
