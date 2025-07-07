<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\SuperadminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware([SuperadminMiddleware::class])->resource('user', UserController::class);
    Route::resource('customer', CustomerController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('pet', PetController::class);
});

Route::middleware('guest')->group(function () {
    Route::get('pesan', function(){
        return "cuma guest yang bisa akses";
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
