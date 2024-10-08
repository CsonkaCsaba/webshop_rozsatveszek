<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Cim extends Model
{
    public function vasarlo(): BelongsToMany
    {
        return $this->belongsToMany(Vasarlo::class, 'cimes')->withPivot('szamlazasi','szallitasi');
    }
    // public function cim(): BelongsToMany
    // {
    //     return $this->belongsToMany(Vasarlo::class, 'cimes','id','cim_id');
    // }

    protected $fillable =[
        'id',
        'iranyitoszam',
        'telepules',
        'utca',
        'hazszam',
    ];
    public $timestamps = false;
}

?>