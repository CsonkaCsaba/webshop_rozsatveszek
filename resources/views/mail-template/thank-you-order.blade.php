<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$subject}}</title>
    <style>
    table, tr, td, th {
    border:1px solid #808080;
    border-collapse: collapse;
    border-radius: 10px;
    text-align: center;
    width: 80%;
    margin-left: 7%;
    }
    th, td {
    padding: 5px;
    }

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
    table, tr{
    width: 40% !important;
    font-size: 8px;
    margin-left: 7%;
    }
  }
</style>
</head>

<body style="background-image: url('https://renoma.hu/wp-content/uploads/2024/09/kezdokep.jpg'); background-repeat: no-repeat;background-position: center; align-items: center; align-content: center; width: 80%; margin: auto; text-align: center; border: 1px solid white;border-radius: 15px; padding: 20px;">
<img src="https://renoma.hu/wp-content/uploads/2025/01/rozsatveszek_logo_kicsi.webp" class="logo" alt="Rózsát veszek webshop" style="border: 1px solid white;border-radius: 15px;" width="150">

    <h1 class="title" style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">👋🏻🟢Köszönjük a rendelésed!🛒✔️🥰</h1>
    <div class="content" style="background-color: white; border: 1px solid black; border-radius: 15px; width: 60%; margin-left: 22%">
        <h3>Kedves {{$name}}!</h3><br>
        <p>
        ✔️ Értesítünk, hogy a webáruházunkban leadott <b>rendelésed a(z) {{$id}} azonosítószámon </b> megérkezett!🎉<br>
        ⏰ A rendelés feldolgozása megkezdődött, szíves türelmed kérjük annak feldolgozásáig.<br>

        Fizetés készpénzben vagy bankkártyával átvételkor.<br>
        <b>💳 Fizetési mód:</b> <br>{{ $pay }}<br>
        <?php
            echo"<p><b>Figyelem!</b> <br> Tekintettel arra, hogy előreutalási fizetési módot választott, <br> a rendelése csak abban az esetben lesz érvényes ha az utalás teljesül.<br>
            <b>Bank neve:</b> Teszt bank<br>
            <b>Bankszámlaszám:</b> 12345678-12345678-12345678-12345678<br>
            <b>IBAN szám:</b> HU 12345678-12345678-12345678-12345678<br>
            <b>SWIFT kód:</b> TPVHUHB <br>
            A közleménybe kérjük, hogy a megrendelés azonosítószámát szíveskedjen feltüntetni!</p><br> ";
        ?>
        <b>🚚📦 Szállítási mód:</b> <br>{{ $szallitas }}<br>
        </p>
        <p><b>Számlázási cím:</b><br>{{ $billingAddress }}</p><br>
        <p><b>Szállítási cím:</b><br>{{ $shippingAddress }}</p><br>
        <table>
            <tr>
                <th style="width:25%">Termék név</th>
                <th style="width:25%">Szín</th>
                <th style="width:25%">Mennyiség</th>
                <th style="width:25%">Egységár</th>
            </tr>
        <?php
        foreach ($products as $product) 
            echo "
            <tr>
                <td>".$product['nevHu']."</td>
                <td>".$product['szin']."</td>
                <td>".$product['quantity']." db</td>
                <td>".$product['ar']." ,-Ft <br></td>
            </tr>
            "
          ;
          ?>
        </table>
        <p><b>Végösszeg:</b> bruttó {{ $total }},-Ft</p><br>
        <?php
        if($comment !="")
            echo"<p><b>Megjegyzés:</b> <br> $comment </p><br> ";
        ?>
        
        <p stlye="padding: 15px;">💝 Köszöjük, hogy bennünket választottál! További kellemes böngészést és vásárlást kívánunk! 🛒</p>
        <p stlye="padding: 15px;">{{-- Footer --}}
        © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')</p>

       
</div>
</body>
</html>