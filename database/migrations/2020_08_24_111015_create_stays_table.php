<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stays', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id');
            $table->foreign('animal_id')->references('id')->on('animals');
            $table->string('start_date');
            $table->string('end_date');
            $table->string('location');
            $table->integer('run_number');
            $table->integer('cage_number');
            $table->string('medication');
            $table->boolean('nails');
            $table->text('information');
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
        Schema::dropIfExists('stays');
    }
}
