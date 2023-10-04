<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

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
// Route::get('/home', function () {
//     return redirect()->route('welcome');;
// });
Route::get('/dolgozoi', function () {
    return view('dolgozoi', [UzletController::class,'index']);
});


Route::put('/uzlet/{id}', [UzletController::class, 'update']);

Route::get('/email/verify', function () {
    return view('auth.verify');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Auth::routes(['verify' => true]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
