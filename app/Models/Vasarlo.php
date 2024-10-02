<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Vasarlo extends Model
{
    public function cim(): BelongsToMany
    {
        return $this->belongsToMany(Cim::class, 'cimes')->withPivot('szamlazasi','szallitasi');
    }

    public function rendeles(): HasMany
    {
        return $this->hasMany(Rendeles::class);
    }

    protected $fillable =[
        'id',
        'nev',
        'email',
        'telefonszam',
        'cegId',
    ];
    public $timestamps = false;
}

?>
