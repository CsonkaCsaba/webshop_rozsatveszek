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
        Schema::create('kepek', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('kepNev')->nullable();
            $table->string('kepUtvonal')->nullable();
            $table->string('kepLeiras')->nullable();

            $table->foreignId('termekId')
            ->constrained(
                table: 'termek', indexName: 'terId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');
            
            $table->foreignId('kategoriaId')
            ->constrained(
                table: 'kategoria', indexName: 'kategId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('uzletId')
            ->constrained(
                table: 'uzlet', indexName: 'uzlId'
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
        Schema::dropIfExists('kepek');
    }
};
