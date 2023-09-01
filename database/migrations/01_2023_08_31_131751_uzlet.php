<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('uzlet', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nev');
            $table->text('bemutatkozasHu');
            $table->text('bemutatkozasEn');
            $table->string('email');
            $table->string('tel');
            $table->string('adoszam');
            $table->string('iranyitoszam');
            $table->string('telepules');
            $table->string('hazszam');
            $table->string('utca'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uzlet');
    }
};
