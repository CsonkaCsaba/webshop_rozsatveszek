@extends('layouts.layout')
@section('content')
<div id="underheader-about-container">

    <div class="under-header mt-8">
        @if (\Session::has('hiba'))
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <h4>{!! \Session::get('hiba') !!}</h4>  
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
            </div>
        @endif
        @if (Auth::user())
        <div class="alert alert-info alert-dismissible fade show" role="alert">
        <h4> Üdvözlünk @auth {{auth()->user()->name}} @endauth!</h4>  
                {{ session('status') }}
                {{ __('You are logged in!') }}
                @if(Auth::user()->admin == 1)<br>
                <a class="link" href="dolgozoi" id="admin">Tovább a dolgozói felületre</a>
                @endif
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
        </div>
        @endif

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

