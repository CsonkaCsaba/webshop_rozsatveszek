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
        Schema::create('cims', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('iranyitoszam');
            $table->string('telepules');
            $table->string('utca');
            $table->string('hazszam');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cims');
    }
};
