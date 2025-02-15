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
        Schema::create('banners', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('szoveg')->nullable();
            $table->string('hatterszin')->nullable();
            $table->string('betuszin')->nullable();
            $table->boolean('aktiv')->nullable();
            $table->integer('sebeseg')->nullable();
            $table->string('betustilus')->nullable();
            $table->string('betutipus')->nullable();
            $table->integer('betumeret')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
