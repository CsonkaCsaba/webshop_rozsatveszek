<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title>Rozsatveszek</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link rel="icon" href="../assets/kepek/logo.png">

        <!-- Styles -->
        <style>
          
        </style>
        @vite(['resources/js/app.js', 'resources/sass/app.scss'])
    </head>
    <body>
    <div id="app">
        <navigation>
        </navigation>
       @yield('content')
    </div>
       <footer>
        <h1>Ez lesz a lábléc</h1>
       </footer>
    </body>
</html>