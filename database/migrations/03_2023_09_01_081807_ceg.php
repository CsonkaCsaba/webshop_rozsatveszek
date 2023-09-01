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
        Schema::create('ceg', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cegnev');
            $table->string('adoszam');

            $table->foreignId('cimId')
            ->constrained(
                table: 'cim', indexName: 'id'
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
        Schema::dropIfExists('ceg');
    }
};
