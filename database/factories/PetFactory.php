<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Pet;
use Illuminate\Database\Eloquent\Factories\Factory;

class PetFactory extends Factory
{
    protected $model = Pet::class;

    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'category_id' => Category::pluck('id')->random(),
            'customer_id' => Customer::pluck('id')->random(),
        ];
    }
}
