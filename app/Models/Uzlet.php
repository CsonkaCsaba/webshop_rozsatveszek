<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Uzlet extends Model
{
  

    protected $fillable =[
        'id',
        'nev',
        'bemutatkozasHu',
        'bemutatkozasEn',
        'email',
        'tel',
        'adoszam',
        'cegjegyzekszam',
        'iranyitoszam',
        'telepules',
        'hazszam',
        'utca',
        'bank',
        'bankszamlaszam',
        'iban',
        'swiftbic'
    ];

    public $timestamps = false;
}
