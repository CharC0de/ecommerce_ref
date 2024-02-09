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
        //protected $fillable = ['code', 'name', 'description', 'category', 'sale_price', 'buy_price', 'discount', 'tax'];
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name');
            $table->string('description');
            $table->string('category');
            $table->float('sale_price');
            $table->float('buy_price');
            $table->float('discount');
            $table->float('tax');
            $table->float('product_upload');
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