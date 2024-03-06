<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Rendeles extends Model
{
    const CREATED_AT = 'rogzitDatum';
    const UPDATED_AT = null;

    public function vasarlo(): BelongsTo
    {
        return $this->belongsTo(Vasarlo::class);
    }

    public function termek(): BelongsToMany
    {
        return $this->belongsToMany(Termek::class, 'valaszts')->withPivot('mennyiseg','kedvezmeny');
    }

    protected $fillable =[
        'id',
        'megjegyzes',
        'fizetesiMod',
        'ceges',
        'allapot',
        'vegosszeg',
        'rogzitDatum',
        'fk_vasarloId',
    ];
}

?>
