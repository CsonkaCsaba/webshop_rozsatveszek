
@props(['url'])
<tr>
<td class="header" style="background-color: #eedbdd; ">
<a href="{{ $url }}" style="display: inline-block;">
<img src="https://renoma.hu/wp-content/uploads/2025/01/rozsatveszek_logo_kicsi.webp" class="logo" alt="Rózsát veszek webshop" style="width: 100%; height: 100%; border: 1px solid white;border-radius: 15px;">
@if (trim($slot) === 'Laravel')
{{-- <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo"> --}}
@else
{{-- {{ $slot }} --}}
@endif
</a>
</td>
</tr>
