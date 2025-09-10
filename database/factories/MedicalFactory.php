<?php

namespace Database\Factories;

use App\Models\Medical;
use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicalFactory extends Factory
{
    protected $model = Medical::class;

    public function definition(): array
    {
        return [
            'pet_id' => Pet::pluck('id')->random(),
            'diagnose' => fake()->paragraph(),
            'price' => fake()->numberBetween(100000, 1000000),
            'user_id' => User::pluck('id')->random(),
        ];
    }
}
