<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$subject}}</title>
</head>

<body style="background-color: #eedbdd; align-items: center; align-content: center; width: 50%;margin: auto; text-align: center; border: 1px solid white;border-radius: 15px;">
<div style="max-width: 50%; max-height: 50%;">
<img src="https://renoma.hu/wp-content/uploads/2024/09/logo.png"class="logo" alt="Rózsát veszek webshop" style="border: 1px solid white;border-radius: 15px;">
</div>
    <h1 style="background-color: white; border: 1px solid white;border-radius: 15px;">KÖSZÖNJÜK REGISZTRÁCIÓJÁT!</h1>
    <h4 >{{$subject}}</h4>
    <p>{{$mailMessage}}</p><br>
    <p>Kellemes böngészést és vásárlást kívánunk!</p>
    {{-- Footer --}}
    © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
</body>
</html>