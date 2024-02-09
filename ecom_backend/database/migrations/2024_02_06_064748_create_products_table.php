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
        Schema::table('products', function (Blueprint $table) {
            // Add the foreign key column
            $table->unsignedBigInteger('user_id');

            // Define the foreign key relationship
            $table->foreign('user_id')
                ->references('id') // Reference the 'id' column in the 'users' table
                ->on('users')
                ->onDelete('restrict'); // Specify the onDelete behavior (in this case, restrict)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the foreign key column and then drop the table
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
