@extends('layouts.layout')
@section('content')

@guest
        <navigation v-once>
        </navigation>
        @else
        <navigation_log v-once>
        </navigation_log>
        
<div class="container mt-8">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Üdvözlünk @auth {{auth()->user()->name}} @endauth!</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    {{ __('You are logged in!') }}    <br><br>
                    <a href="/webshop_rozsatveszek/public/" class="btn btn-primary">OK</a>
                </div> 
            </div>
        </div>  
    </div>
</div>
@endguest
@endsection
