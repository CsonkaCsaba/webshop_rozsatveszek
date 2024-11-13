@extends('layouts.layout')
@section('content')
<div class="content">
      <div class="d-flex flex-column justify-content-center pt-md-8">
            <h2 class="pb-2 text-center fontcolor">KÍVÁNSÁGLISTA</h2>
            <hr class="cimalatt_hr mx-auto mt-0">
      </div>
</div>
@if (Auth::user())
<wishlist></wishlist>
@else
<WishlistNotLoggedIn></WishlistNotLoggedIn>
@endif
@endsection