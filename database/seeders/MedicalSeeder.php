<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Medical;
use Spatie\Permission\Models\Permission;

class MedicalSeeder extends Seeder
{
    public function run(): void
    {
        Medical::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Medical model has SoftDeletes
        $permissions = [
            "menu medical",
            "index medical",
            "show medical",
            "create medical",
            "update medical",
            "delete medical",
            //"archived medical",
            //"restore medical",
            //"force delete medical",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "medical",
                'name' => $permit,
            ]);
        }
    }
}
