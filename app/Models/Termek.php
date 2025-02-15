<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Termek extends Model
{
    use HasFactory;

    public function rendeles(): BelongsToMany
    {
        return $this->belongsToMany(Rendeles::class, 'valaszts')->withPivot('mennyiseg','kedvezmeny');
    }
    public function cimke(): BelongsTo
    {
        return $this->belongsTo(Cimke::class);
    }

    protected $fillable =[
        'id',
        'nevHu',
        'nevEn',
        'ar',
        'img',
        'url',
        'leirasHu',
        'leirasEn',
        'szin',
        'color',
        'keszlet',
        'created_at',
        'updated_at',
    ];
}
