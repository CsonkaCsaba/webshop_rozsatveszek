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
    <div id="app">
    <navigation_admin>
    </navigation_admin>
       @yield('content')
    </div>

 <!-- Kijelentkezés modal  -->
<div class="modal fade" id="LogoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabellogout" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabellogout">Biztosan kijelentkezik?</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="card-body">
            <button type="button" class="btn btn-primary m-2"  onclick="localStorage.clear();">
            <a class="dropdown-item" href="{{ route('logout') }}"
            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
            {{ __('Logout') }} </a></button>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
        </form> 
        
        
   
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Mégsem</button>
            </div>
        </div>
    </div>
</div>
</div>

   
    </body>
</html>