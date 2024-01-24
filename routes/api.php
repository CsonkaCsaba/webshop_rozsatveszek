<?php

use App\Http\Controllers\HirekController;
use App\Http\Controllers\KepekController;
use App\Http\Controllers\UzletController;
use App\Http\Controllers\TermekController;
use App\Http\Controllers\KategoriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('/uzlet', UzletController::class);
Route::resource('/galeria', KepekController::class);
Route::resource('/termekek', TermekController::class);
Route::post('/galeria/upload', [KepekController::class, 'upload']);
Route::resource('/hirek', HirekController::class);

