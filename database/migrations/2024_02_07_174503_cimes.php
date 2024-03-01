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
            $table->foreignId('cim_id')->references('id')->on('cims')->onUpdate('cascade')->onDelete('cascade');   
            $table->foreignId('vasarlo_id')->references('id')->on('vasarlos')->onUpdate('cascade')->onDelete('cascade');
            
            $table->boolean('szallitasi')->default(0);
            $table->boolean('szamlazasi')->default(0);

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
