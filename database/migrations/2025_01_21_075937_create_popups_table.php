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
        Schema::create('popups', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cim')->nullable();
            $table->string('szoveg')->nullable();
            $table->foreignId('kepId')
            ->constrained(
                table: 'kepeks', indexName: 'photoId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');
            
            $table->boolean('aktiv')->nullable();
            $table->string('hatterszin')->nullable();
            $table->string('betuszin')->nullable();
            $table->boolean('fotomutat')->nullable();
            $table->string('betustilus')->nullable();
            $table->string('betutipus')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('popups');
    }
};
