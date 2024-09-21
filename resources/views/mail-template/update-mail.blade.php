<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$subject}} - {{$status}}</title>
</head>

<body style="background-image: url('https://renoma.hu/wp-content/uploads/2024/09/kezdokep.jpg'); background-repeat: no-repeat;background-position: center; align-items: center; align-content: center; width: 80%; margin: auto; text-align: center; border: 1px solid white;border-radius: 15px; padding: 20px;">
<img src="https://renoma.hu/wp-content/uploads/2024/09/logo.png" class="logo" alt="Rózsát veszek webshop" style="border: 1px solid white;border-radius: 15px;" width="150">

    <h1 style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">RENDELÉSÉNEK ÁLLAPOTA MEGVÁLTOZOTT!</h1>
    <div style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">
        <h3>Kedves {{$name}}!</h3><br>
        <p>{{$mailMessage}}</p>
        <p>Rendelésének aktuális állapota:</p>
        <p style="text-transform: uppercase;"><b>{{$status}}<b></p><br>
        <p>Köszöjük, hogy bennünket választott! További kellemes böngészést és vásárlást kívánunk!</p>
        {{-- Footer --}}
        © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
</div>
</body>
</html>