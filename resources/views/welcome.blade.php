@extends('layouts.layout')
@section('content')

<div id="underheader-about-container">

    <div class="under-header">
        @if (\Session::has('hiba'))
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <h4>{!! \Session::get('hiba') !!}</h4>  
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
            </div>
        @endif
        @if(session('success'))
        <div class="alert alert-info alert-dismissible fade show d-flex align-items-center p-3 m-3" role="alert">
                <h4>{{ session('success')}}</h4>  
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
            </div>
            @endif
        @if (Auth::user())
        <script>
            localStorage.clear();
        </script>
        <div class="alert alert-info alert-dismissible fade show align-items-center text-center position-absolute w-100" role="alert">
        <h4> 👋 Üdvözlünk @auth {{auth()->user()->name}} !</h4>
                {{ session('status') }}
                {{ __('You are logged in!') }}
                @if(Auth::user() &&  Auth::user()->admin == 1)<br>
                <!-- <script>window.location = "http://localhost/webshop_rozsatveszek/public/dolgozoi";</script>  -->
                <a class="link" href="dolgozoi" id="admin"> <button type="button" class="btn btn-dark mt-4">Tovább a dolgozói felületre</button></a>
                @endif
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
        </div>
        @endauth
        @endif

        <p>Vásároljon rózsát<br> közvetlen a termelőtől!</p>
        <hr>
        <a href="termekek"><button type="button" class="btn btn-vasarlas">Vásárlás</button></a>
            @if(session('success'))
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card" style="background-color: white;" id="verifycard">
                        <div class="card-header">{{ __('Verify Your Email Address') }}</div>

                        <div class="card-body d-flex flex-column align-items-center">
                            @if (session('resent'))
                                <div class="alert alert-success" role="alert">
                                    {{ __('A fresh verification link has been sent to your email address.') }}
                                </div>
                            @endif
                            <div>
                            <img src="../resources/assets/kepek/email.gif" alt="email" height="300">
                            </div>
                            {{ __('Before proceeding, please check your email for a verification link.') }}
                            <!-- {{ __('If you did not receive the email') }},
                            <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                                @csrf
                                <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('click here to request another') }}</button>.
                            </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif
        <div id="cover-box" class="w-75 d-flex bg-white border-secondary shadow">
            <div class="container">
                <div class="row justify-content-around m-2">
                    <div class="col text-center p-4">
                        <img class="services" src="../resources/assets/kepek/cover-box-trolley.png">
                        <p class="m-1">Megbízható<br> csomagolás és szállítás</p>
                    </div>
                    <div class="col text-center p-4">
                        <img class="services" src="../resources/assets/kepek/cover-box-card.png">
                        <p class="m-1">Biztonságos<br> fizetés</p>  
                    </div>
                    <div class="col text-center p-4">
                        <img class="services" src="../resources/assets/kepek/cover-box-discount.png">
                        <p class="m-1">Rendszeres<br> kedvezmények</p>  
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-around">
            </div>
        </div>
    </div>
    <Home v-once>
    </Home>
    
<div>

@endsection

