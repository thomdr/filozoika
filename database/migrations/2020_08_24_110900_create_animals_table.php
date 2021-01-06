<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('species');
            $table->string('gender');
            $table->string('date_of_birth');
            $table->string('vet');
            $table->boolean('own_food');
            $table->string('food_amount');
            $table->foreignId('owner_id');
            $table->foreign('owner_id')->references('id')->on('owners');
            $table->string('pasport');
            $table->string('photo');
            $table->text('information');
            $table->boolean('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animals');
    }
}
