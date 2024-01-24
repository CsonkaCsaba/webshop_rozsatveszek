<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Hirek extends Model
{   
    public function photo(): HasOne 
    {

        return $this->hasOne(Kepek::class, 'id', 'kepId')->withDefault();
    }

    protected $fillable =[
        'id',
        'cim',
        'leiras',
        'datum',
        'uzletId'
    ];
    public $timestamps = false;

}
