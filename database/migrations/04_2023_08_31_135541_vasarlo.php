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
        Schema::create('vasarlo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('email')->unique();
            $table->string('telefonszam');
            $table->string('vezetéknev')->nullable();
            $table->string('keresztnev')->nullable();
            $table->foreignId('cegId')
            ->constrained(
                table: 'ceg', indexName: 'cegId'
            )->nullable()
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('cimId')
            ->constrained(
                table: 'cim', indexName: 'cimId'
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
        Schema::dropIfExists('vasarlo');
    }
};
