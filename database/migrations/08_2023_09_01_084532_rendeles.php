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
        Schema::create('rendeles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('megjegyzes');
            $table->string('fizetesiMod');
            $table->boolean('ceges');
            $table->string('allapot');
            $table->timestamp('rogzitDatum')->nullable();
            $table->integer('vegosszeg');

            $table->foreignId('fk_vasarloId')
            ->constrained(
                table: 'vasarlos', indexName: 'fk_vasarloid'
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
        Schema::dropIfExists('rendeles');
    }
};
