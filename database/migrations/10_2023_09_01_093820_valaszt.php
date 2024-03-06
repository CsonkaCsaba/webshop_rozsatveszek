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
        Schema::create('valaszts', function (Blueprint $table) {
            $table->integer('mennyiseg')->nullable();
            $table->integer('kedvezmeny')->nullable();

            $table->foreignId('rendeles_id')->references('id')->on('rendeles')->onUpdate('cascade')->onDelete('cascade');   
            $table->foreignId('termek_id')->references('id')->on('termeks')->onUpdate('cascade')->onDelete('cascade');   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('valaszts');
    }
};
