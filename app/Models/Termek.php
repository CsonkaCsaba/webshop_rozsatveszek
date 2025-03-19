<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Termek extends Model
{
    use HasFactory;

    public function rendeles(): BelongsToMany
    {
        return $this->belongsToMany(Rendeles::class, 'valaszts')->withPivot('mennyiseg','kedvezmeny');
    }
    public function cimke(): BelongsTo
    {
        return $this->belongsTo(Cimke::class, 'cimkeId');
    }
    public function galeria(): HasMany
    {
        return $this->hasMany(TermekGaleria::class, 'termekid');
    }

    protected $fillable =[
        'id',
        'nevHu',
        'nevEn',
        'ar',
        'akciosar',
        'img',
        'url',
        'leirasHu',
        'leirasEn',
        'szin',
        'color',
        'keszlet',
        'egyseg',
        'cikkszam',
        'created_at',
        'updated_at',
        'cimkeId',
        'tagline'
    ];
}
