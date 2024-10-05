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
<img src="https://renoma.hu/wp-content/uploads/2024/09/logo.png" class="logo" alt="Rózsát veszek webshop" style="border: 1px solid white;border-radius: 15px;" width="150">

    <h1 class="title" style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">KÖSZÖJÜK RENDELÉSÉT!</h1>
    <div class="content" style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">
        <h3>Kedves {{$name}}!</h3><br>
        <p>
        Értesítjük, hogy a webáruházunkban leadott rendelése a(z) {{$id}} azonosítószámon megérkezett! <br>
        A rendelés feldolgozása megkezdődött, szíves türelmét kérjük annak feldolgozásáig.<br>

        Fizetés készpénzben vagy bankkártyával átvételkor.
        </p>
        <p><b>Számlázási cím:</b>{{ $billingAddress }}</p><br>
        <p><b>Szállítási cím:</b>{{ $shippingAddress }}</p><br>
        <p><b>Végösszeg:</b> bruttó {{ $total }},-Ft</p><br>
        <p>Köszöjük, hogy bennünket választott! További kellemes böngészést és vásárlást kívánunk!</p>
        {{-- Footer --}}
        © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')

        public $products;
</div>
</body>
</html>