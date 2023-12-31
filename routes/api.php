<?php

use App\Http\Controllers\KepekController;
use App\Http\Controllers\UzletController;
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
Route::post('/galeria/upload', [KepekController::class, 'upload']);

