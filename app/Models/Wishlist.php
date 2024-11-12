<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wishlist extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
    public function product(): HasMany
    {
        return $this->hasMany(Termek::class, 'id', 'product_id');
    }
    protected $fillable =[
        'id',
        'user_id',
        'product_id'
    ];
    public $timestamps = false;
}
