<?php

use App\Http\Controllers\UzletController;
use App\Http\Middleware\IsAdmin;
use App\Models\Hirek;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\HirekController;
use Inertia\Inertia;

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
Route::get('/kosar', function () {
    return view('kosar');
});
Route::get('/szamlazas', function () {
    return view('szamlazas');
});
Route::get('/szallitas', function () {
    return view('szallitas');
});
Route::get('/megrendeles', function () {
    return view('megrendeles');
});
// Route::get('/home', function () {
//     return redirect()->route('welcome');;
// });


Route::put('/uzlet/{id}', [UzletController::class, 'update']);

Route::get('/email/verify', function () {
    return view('auth.verify');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Auth::routes(['verify' => true]);


Route::get('dolgozoi', function () {
    return view('dolgozoi', [UzletController::class,'index']);
})->middleware('admin')->name('admin');


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/dolgozoi', [HirekController::class, 'index']);

Route::get('/welcome', [HirekController::class, 'index']);
