<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Termek extends Model
{
    use HasFactory;

    public function rendeles(): BelongsToMany
    {
        return $this->belongsToMany(Rendeles::class, 'valaszts')->withPivot('mennyiseg','kedvezmeny');
    }
}
