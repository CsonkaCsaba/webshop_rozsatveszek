@extends('layouts.app')

@section('content')
<div class="underheader-about-container">
    <div class="under-header">
        <p>Vásároljon rózsát<br> közvetlen a termelőtől!</p>
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
        <div class="row justify-content-center absolute" id="logreg">
            <div class="col-md-8">
            <div class="card">
                <div class="card-header text-uppercase"><strong>{{ __('Register') }}</strong></div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="row mb-3">
                            <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

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
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
@endsection
