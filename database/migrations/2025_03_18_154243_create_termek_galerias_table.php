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
        Schema::create('termek_galerias', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('kepNev')->nullable();
            $table->string('kepUtvonal')->nullable();
            $table->string('kepLeiras')->nullable();

            $table->foreignId('termekid')->nullable()
            ->constrained(
                table: 'termeks', indexName: 'termid'
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
        Schema::dropIfExists('termek_galerias');
    }
};
