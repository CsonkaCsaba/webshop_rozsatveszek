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
        Schema::create('valaszt', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('mennyiseg');
            $table->integer('kedvezmeny');

            $table->foreignId('rendelesId')
            ->constrained(
                table: 'rendeles', indexName: 'rendelId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('termekId')
            ->constrained(
                table: 'termek', indexName: 'termId'
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
        Schema::dropIfExists('valaszt');
    }
};
