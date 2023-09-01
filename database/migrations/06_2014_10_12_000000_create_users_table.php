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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('userName');
            $table->string('password');
            $table->string('lastName');
            $table->string('firstName');
            $table->string('address');
            $table->date('birthDate');
            $table->date('lastLogin');
            $table->boolean('admin');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreignId('dolgozoId')
            ->constrained(
                table: 'dolgozo', indexName: 'dolgozoId'
            )
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreignId('vasarloId')
            ->constrained(
                table: 'vasarlo', indexName: 'vasarloId'
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
        Schema::dropIfExists('users');
    }
};
