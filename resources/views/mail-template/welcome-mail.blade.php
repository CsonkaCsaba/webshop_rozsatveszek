<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$subject}}</title>
    <style>
  @media screen and (max-width: 600px) {
    .title{
        width: 80% !important;
        font-size: 20px;
        margin-left: 6% !important;

    }
    .content {
        width: 80% !important;
        display: block !important;
        padding: 5px !important;
        text-align: center;
        margin-left: 6% !important;
    }
    .header, .body, .footer {
        width: 100%;
        padding: 2% !important;
    }
  }
</style>
</head>

<body style="background-image: url('https://renoma.hu/wp-content/uploads/2024/09/kezdokep.jpg'); background-repeat: no-repeat;background-position: center; align-items: center; align-content: center; width: 80%; margin: auto; text-align: center; border: 1px solid white;border-radius: 15px; padding: 20px;">
<img src="https://renoma.hu/wp-content/uploads/2025/01/rozsatveszek_logo_kicsi.webp" class="logo" alt="Rózsát veszek webshop" style="border: 1px solid white;border-radius: 15px;" width="150">

    <h1 class="title" style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">👋🏻🟢Köszönjük a regisztrációd!✔️🥰</h1>
    <div class="content" style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">
        <h4 >{{$subject}}</h4>
        <p>{{$mailMessage}}</p><br>
        <p>💝 Köszöjük, hogy bennünket választottál! Kellemes böngészést és vásárlást kívánunk! 🛒</p>
        {{-- Footer --}}
        © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
</div>
</body>
</html>