<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\HasOne;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    public function photo(): HasOne 
    {

        return $this->hasOne(Kepek::class, 'id', 'kepId')->withDefault();
    }
    protected $fillable =[
        'id',
        'cim',
        'szoveg',
        'kepId',
        'aktiv',
        'hatterszin',
        'betuszin',
       'fotomutat',
       'betustilus',
        'betutipus'
    ];
    public $timestamps = false;
}
