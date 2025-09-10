<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pet;
use Spatie\Permission\Models\Permission;

class PetSeeder extends Seeder
{
    public function run(): void
    {
        Pet::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Pet model has SoftDeletes
        $permissions = [
            "menu pet",
            "index pet",
            "show pet",
            "create pet",
            "update pet",
            "delete pet",
            //"archived pet",
            //"restore pet",
            //"force delete pet",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "pet",
                'name' => $permit,
            ]);
        }
    }
}
