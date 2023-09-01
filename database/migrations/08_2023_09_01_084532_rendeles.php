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
        Schema::create('rendeles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('megjegyzes');
            $table->string('fizetesiMod');
            $table->boolean('ceges');
            $table->string('allapot');
            $table->timestamp('rogzitDatum')->nullable();
            $table->integer('vegosszeg');

            $table->foreignId('vasarloId')
            ->constrained(
                table: 'vasarlo', indexName: 'vasarId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('szamlazasicimId')
            ->constrained(
                table: 'cim', indexName: 'szamlazasiId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('szallitasicimId')
            ->constrained(
                table: 'cim', indexName: 'szallitasiId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendeles');
    }
};
