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
        Schema::create('valaszts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('mennyiseg');
            $table->integer('kedvezmeny');

            $table->foreignId('rendelesId')
            ->constrained(
                table: 'rendeles', indexName: 'id'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('termekId')
            ->constrained(
                table: 'termeks', indexName: 'termekid'
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
        Schema::dropIfExists('valaszts');
    }
};
