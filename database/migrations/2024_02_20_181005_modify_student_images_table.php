<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyStudentImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('student_images', function (Blueprint $table) {
            $table->dropColumn('image_data'); // Eltávolítjuk az image_data oszlopot
        $table->string('image_url')->after('student_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('student_images', function (Blueprint $table) {
            $table->binary('image_data'); // Visszaállítjuk az image_data oszlopot
            $table->dropColumn('image_url');
        });
    }
}
