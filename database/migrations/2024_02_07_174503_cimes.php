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
        Schema::create('cimes', function (Blueprint $table) {
            $table->foreignId('fk_cimId')
            ->constrained(
                table: 'cims', indexName: 'fk_cimid'
            )->nullable()
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('vasarloId_fk')
            ->constrained(
                table: 'vasarlos', indexName: 'vasarloid_fk'
            )->nullable()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            
            $table->boolean('szallitasi');
            $table->boolean('szamlazasi');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cimes');
    }
};
