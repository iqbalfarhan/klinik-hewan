<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use Spatie\Permission\Models\Permission;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        Customer::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Customer model has SoftDeletes
        $permissions = [
            "menu customer",
            "index customer",
            "show customer",
            "create customer",
            "update customer",
            "delete customer",
            //"archived customer",
            //"restore customer",
            //"force delete customer",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "customer",
                'name' => $permit,
            ]);
        }
    }
}
