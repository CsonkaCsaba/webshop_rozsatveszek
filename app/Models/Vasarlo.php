<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Vasarlo extends Model
{
    public function cim(): BelongsToMany
    {
        return $this->belongsToMany(Cim::class, 'cimes')->withPivot('szamlazasi','szallitasi');
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
