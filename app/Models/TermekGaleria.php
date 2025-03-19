<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class TermekGaleria extends Model
{
    public function product(): BelongsTo 
    {

        return $this->belongsTo(Termek::class, 'termekid', 'id')->withDefault();
    }
    
    protected $fillable =[
        'id',
        'kepNev',
        'kepUtvonal',
        'kepLeiras',
        'termekid',
    ];

    public $timestamps = false;
}
