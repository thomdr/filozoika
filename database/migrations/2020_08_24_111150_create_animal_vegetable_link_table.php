<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalVegetableLinkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animal_vegetable_link', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id');
            $table->foreign('animal_id')->references('id')->on('animals');
            $table->foreignId('vegetable_id');
            $table->foreign('vegetable_id')->references('id')->on('vegetables');
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
        Schema::dropIfExists('animal_vegetable_link');
    }
}
