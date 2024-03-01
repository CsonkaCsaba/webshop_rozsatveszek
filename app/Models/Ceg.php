<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasOne;


class Ceg extends Model
{
    public function cim(): hasOne
    {
        return $this->hasOne(Cim::class);
    }

    protected $fillable =[
        'id',
        'cegnev',
        'adoszam',
        'cimId'
    ];
    public $timestamps = false;
}

?>