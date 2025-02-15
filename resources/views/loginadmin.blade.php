<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title>Rózsák közvetlen a termelőtől - rozsatveszek.hu</title>
        <link rel="shortcut icon" href="{{ asset('img/rozsatveszek_logo_kicsi-removebg-preview.webp') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <!-- <link rel="icon" href="../assets/kepek/logo.png"> -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <!-- Styles -->
        <style>
        </style>
        @vite(['resources/js/app.js', 'resources/sass/app.scss', 'resources/css/app.css'])
    </head>
    <body>
<div id="">
    <div class="under-header">
        <p>A FELÜLETRE A BELÉPÉS <br>CSAK DOLGOZÓI JOGOSULTÁGGAL LEHETSÉGES</p>
        <hr>
        <a href="termekek"><button type="button" class="btn btn-vasarlas">Vásárlás</button></a>
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
        </div>
            <div class="row justify-content-center" id="logreg">
                <div class="col-md-8">
                    <div class="card transition">
                        
                        <div class="card-header text-uppercase d-flex flex-row"><strong>{{ __('Login') }} DOLGOZÓKÉNT</strong><div class="closebutton"> <a href="/webshop_rozsatveszek/public/">X</a></div></div> 

                        <div class="card-body">
                                        @if(Session::get('msg'))
                                        <div class="text-center ">
                                            <p class="text-danger fs-6">{{Session::get('msg')}}</p>
                                        </div>
                                        @endif
                            <form method="POST" action="{{ route('login') }}">
                                @csrf

                                <div class="row mb-3">
                                    <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                                    <div class="col-md-6">
                                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                                    <div class="col-md-6">
                                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-6 offset-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                            <label class="form-check-label" for="remember">
                                                {{ __('Remember Me') }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-0">
                                    <div class="col-md-8 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                            {{ __('Login') }}
                                        </button>
                                        @if (Route::has('password.request'))
                                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                                {{ __('Forgot Your Password?') }}
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

    </div>
</div>
</div>
</body>
</html>

