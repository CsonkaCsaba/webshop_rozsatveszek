<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Kepek extends Model
{
    public function product(): HasOne 
    {

        return $this->hasOne(Termek::class, 'id', 'termekId')->withDefault();
    }
    
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
