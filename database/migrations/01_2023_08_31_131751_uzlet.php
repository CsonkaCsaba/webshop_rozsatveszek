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
        Schema::create('uzlets', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nev')->nullable();
            $table->text('bemutatkozasHu')->nullable();
            $table->text('bemutatkozasEn')->nullable();
            $table->string('email')->nullable();
            $table->string('tel')->nullable();
            $table->string('adoszam')->nullable();
            $table->string('cegjegyzekszam')->nullable();
            $table->string('iranyitoszam')->nullable();
            $table->string('telepules')->nullable();
            $table->string('hazszam')->nullable();
            $table->string('utca')->nullable();
            $table->string('bank')->nullable();
            $table->string('bankszamlaszam')->nullable();
            $table->string('iban')->nullable();
            $table->string('swiftbic')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uzlets');
    }
};
