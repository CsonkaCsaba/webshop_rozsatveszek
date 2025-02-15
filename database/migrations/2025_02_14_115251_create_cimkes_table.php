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
        Schema::create('cimkes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cim');
            $table->text('szoveg')->nullable();
            $table->string('hatterszin')->nullable();
            $table->string('betuszin')->nullable();
            $table->string('betustilus')->nullable();
            $table->string('betutipus')->nullable();
            $table->integer('betumeret')->nullable();
            $table->integer('akciosarFt')->nullable();
            $table->integer('akciosarSzazalek')->nullable();

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
        Schema::dropIfExists('cimkes');
    }
};
