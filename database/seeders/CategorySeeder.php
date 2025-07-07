<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Category::factory(10)->create();

        Category::create(['name' => 'kucing']);
        Category::create(['name' => 'anjing']);
        Category::create(['name' => 'landak']);
        Category::create(['name' => 'tringiling']);
        Category::create(['name' => 'babi']);
    }
}
