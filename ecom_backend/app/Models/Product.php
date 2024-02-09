<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['code', 'name', 'description', 'category', 'sale_price', 'buy_price', 'discount', 'tax', 'user_id'];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'sale_price' => 'float', 'buy_price' => 'float', 'discount' => 'float', 'tax' => 'float',
    ];
}