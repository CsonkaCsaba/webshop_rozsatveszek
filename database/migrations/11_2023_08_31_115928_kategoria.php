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
        Schema::create('kategoria', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nevHu');
            $table->string('nevEn');
            $table->text('leirasHu');
            $table->text('leirasEn');
            $table->string('url');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('kategoria');
    }
};
