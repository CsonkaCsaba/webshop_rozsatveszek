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
        Schema::create('vasarlos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nev')->nullable();
            $table->string('email')->unique();
            $table->string('telefonszam');
            $table->foreignId('cegId')->nullable()
            ->constrained(
                table: 'cegs', indexName: 'cegid'
            )->nullable()
            ->onUpdate('cascade')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vasarlos');
    }
};
