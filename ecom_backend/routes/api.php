<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/create-product', [ProductController::class, 'create']);
Route::post('/register', [UserController::class, 'create']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/userData', [UserController::class, 'read']);
Route::post('/create-product', [ProductController::class, 'create']);
Route::delete('/userData/{id}', [UserController::class, 'delete']);
Route::patch('/userData/{id}', [UserController::class, 'update']);
Route::get('/productData', [ProductController::class, 'read']);
Route::put('/productData/{id}', [ProductController::class, 'put']);
Route::delete('/productData/{id}', [UserController::class, 'delete']);