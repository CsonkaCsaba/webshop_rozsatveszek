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
        Schema::create('dolgozo', function(Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->foreignId('uzletId')
            ->constrained(
                table: 'uzlets', indexName: 'uzletId'
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
        Schema::dropIfExists('dolgozo');
    }
};
