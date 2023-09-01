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
        Schema::create('termek', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nevHu');
            $table->string('nevEn');
            $table->integer('ar');
            $table->string('url');
            $table->text('leirasHu');
            $table->text('leirasEn');
            $table->string('szin');
            $table->integer('keszlet');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
