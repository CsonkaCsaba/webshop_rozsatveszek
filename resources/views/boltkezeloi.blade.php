@extends('layouts.adminlayout')
@section('content')

<div class="content">
    <div class="fejlec d-flex flex-column justify-content-center pt-md-8">
    <h2 class="pb-2 text-center fontcolor">BOLT KEZELŐI FELÜLET</h2>
        <hr class="cimalatt_hr m-auto mt-0">
    </div>
</div>

<dolgozoi :manager="true">
</dolgozoi>
@endsection