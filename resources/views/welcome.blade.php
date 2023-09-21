@extends('layouts.layout')
@section('content')
<div id="underheader-about-container">
    <div class="under-header mt-7">
        <p>Vásároljon rózsát<br> közvetlen a termelőtől!</p>
        <hr>
        <button type="button" class="btn btn-vasarlas">Vásárlás</button>
        <div id="cover-box" class="w-75 d-flex bg-white border-secondary">
            <div class="container">
                <div class="row justify-content-around m-2">
                    <div class="col text-center">
                        <img class="services" src="../resources/assets/kepek/cover-box-trolley.png">
                        <p class="m-1">Megbízható<br> csomagolás és szállítás</p>
                    </div>
                    <div class="col text-center">
                        <img class="services" src="../resources/assets/kepek/cover-box-card.png">
                        <p class="m-1">Biztonságos<br> fizetés</p>  
                    </div>
                    <div class="col text-center">
                        <img class="services" src="../resources/assets/kepek/cover-box-discount.png">
                        <p class="m-1">Rendszeres<br> kedvezmények</p>  
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-around">
            </div>
        </div>
    </div>
    <about>
    </about>
    <news>
    </news>
<div>
@endsection

