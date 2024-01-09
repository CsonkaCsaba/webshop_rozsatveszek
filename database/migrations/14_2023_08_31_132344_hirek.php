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
        Schema::create('hirek', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cim');
            $table->text('leiras');
            $table->timestamp('datum')->nullable();

            $table->foreignId('uzletId')
            ->constrained(
                table: 'uzlets', indexName: 'shopId'
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
        Schema::dropIfExists('hirek');
    }
};
