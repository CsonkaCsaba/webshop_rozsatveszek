<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\CimController;
use App\Http\Controllers\CimeController;
use App\Http\Controllers\HirekController;
use App\Http\Controllers\KepekController;
use App\Http\Controllers\UzletController;
use App\Http\Controllers\TermekController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\PopupController;
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
Route::get('/hirek', [HirekController::class, 'show']);
Route::resource('/hirekadmin', HirekController::class);
Route::post('/hirekadmin/create', [HirekController::class,'create']);
Route::middleware('web')->post('/megrendeles/storeOrder', [OrderController::class, 'storeOrder']);
Route::middleware('web')->get('/user/orders', [UserController::class, 'orders']);
Route::post('/termekadmin/create', [TermekController::class,'create']);
Route::resource('/termekadmin', TermekController::class);
Route::put('/termekadmin/{id}', [TermekController::class,'update']);
Route::put('/termekadminmennyiseg/{id}', [TermekController::class,'updateQuantity']);
Route::get('/rendelesek', [OrderController::class,'show']);
Route::get('/rendelesekCim', [OrderController::class,'cim']);
Route::put('/rendelesek/{id}', [OrderController::class,'update']);
Route::delete('/rendelesek/{id}', [OrderController::class,'destroy']);
Route::middleware('web')->get('/user/wishlist', [UserController::class,'wishlist']);
Route::middleware('web')->post('/user/wishlist', [WishlistController::class, 'storeWish']);
Route::middleware('web')->delete('/user/wishlist/{id}', [WishlistController::class,'destroy']);
//Route::middleware('web')->delete('/user/wishlistProduct/{id}', [WishlistController::class,'destroyProduct']);
Route::get('/banner', [BannerController::class,'index']);
Route::put('/banner/{id}', [BannerController::class,'update']);
Route::get('/popup', [PopupController::class,'index']);
Route::put('/popup/{id}', [PopupController::class,'update']);


