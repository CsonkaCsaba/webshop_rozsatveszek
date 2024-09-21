<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$subject}}</title>
</head>

<body style="background-image: url('https://renoma.hu/wp-content/uploads/2024/09/kezdokep.jpg'); background-repeat: no-repeat;background-position: center; align-items: center; align-content: center; width: 80%; margin: auto; text-align: center; border: 1px solid white;border-radius: 15px; padding: 20px;">
<img src="https://renoma.hu/wp-content/uploads/2024/09/logo.png" class="logo" alt="Rózsát veszek webshop" style="border: 1px solid white;border-radius: 15px;" width="150">

    <h1 style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">KÖSZÖNJÜK REGISZTRÁCIÓJÁT!</h1>
    <div style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">
        <h4 >{{$subject}}</h4>
        <p>{{$mailMessage}}</p><br>
        <p>Kellemes böngészést és vásárlást kívánunk!</p>
        {{-- Footer --}}
        © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
</div>
</body>
</html>