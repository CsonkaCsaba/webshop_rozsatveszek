<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kepek extends Model
{
    
    protected $fillable =[
        'id',
        'kepNev',
        'kepUtvonal',
        'kepLeiras',
        'termekId',
        'kategoriaId',
        'uzletId'
    ];

    public $timestamps = false;
}
