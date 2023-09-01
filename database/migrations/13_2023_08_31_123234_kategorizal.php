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
        Schema::create('kategorizal', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->foreignId('termekId')
            ->constrained(
                table: 'termek', indexName: 'tmekId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');
            
            $table->foreignId('kategoriaId')
            ->constrained(
                table: 'kategoria', indexName: 'katId'
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
        Schema::dropIfExists('kategorizal');
    }
};
