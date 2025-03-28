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
        Schema::create('termeks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nevHu');
            $table->string('nevEn')->nullable();
            $table->integer('ar');
            $table->integer('akciosar')->nullable();
            $table->string('img')->nullable();
            $table->string('url')->nullable();
            $table->text('leirasHu');
            $table->text('leirasEn')->nullable();
            $table->string('szin');
            $table->string('color')->nullable();
            $table->integer('keszlet');
            $table->string('egyseg')->nullable();
            $table->integer('cikkszam')->nullable();
            $table->timestamps();

            $table->foreignId('cimkeId')->nullable()
            ->constrained(
                table: 'cimkes', indexName: 'cimkeid'
            )
            ->onUpdate('set null')
            ->onDelete('set null');
            $table->string('tagline');
            $table->boolean('kozzeteve')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termeks');
    }
};
