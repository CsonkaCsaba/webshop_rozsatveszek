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
        Schema::create('felhasznalo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('felhNev');
            $table->string('jelszo');
            $table->string('vezNev');
            $table->string('kerNev');
            $table->string('lakcim');
            $table->date('szulDatum');
            $table->date('utolsoBeDatum');
            $table->boolean('admin');

            $table->foreignId('dolgozoId')
            ->constrained(
                table: 'dolgozo', indexName: 'dolgId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('vasarloId')
            ->constrained(
                table: 'vasarlo', indexName: 'vasarlId'
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
        Schema::dropIfExists('felhasznalo');
    }
};
