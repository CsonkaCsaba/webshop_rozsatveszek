<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cimke extends Model
{
    use HasFactory;

    public function products(): HasMany
    {
        return $this->hasMany(Termek::class, 'id', 'termekId');
    }
    protected $fillable =[
        'id',
        'cim',
        'szoveg',
        'hatterszin',
        'betuszin',
        'betustilus',
        'betutipus',
        'betumeret',
        'akciosarFt',
        'akciosarSzazalek',
        'termekId'
    ];
    public $timestamps = false;
}
