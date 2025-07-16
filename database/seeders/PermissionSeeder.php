<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create-user' => ["superadmin", 'admin'],
            'edit-user'  => ["superadmin", 'admin'],
            'delete-user'  => ["superadmin", 'admin'],
            'view-user'  => ["superadmin", 'admin'],
            'create-role'  => ["superadmin", 'admin'],
            'edit-role'  => ["superadmin", 'admin'],
            'delete-role'  => ["superadmin", 'admin'],
            'view-role'  => ["superadmin", 'admin'],
            'create-permission'  => ["superadmin", 'admin'],
            'edit-permission'  => ["superadmin", 'admin'],
            'delete-permission'  => ["superadmin", 'admin'],
            'view-permission'  => ["superadmin", 'admin'],
            'create-product'  => ["superadmin", 'admin'],
            'edit-product'  => ["superadmin", 'admin'],
            'delete-product'  => ["superadmin", 'admin'],
            'view-product'  => ["superadmin", 'admin'],
            'create-category'  => ["superadmin", 'admin'],
            'edit-category'  => ["superadmin", 'admin'],
            'delete-category'  => ["superadmin", 'admin'],
            'view-category'  => ["superadmin", 'admin'],
            'create-order'  => ["superadmin", 'admin'],
            'edit-order'  => ["superadmin", 'admin'],
            'delete-order'  => ["superadmin", 'admin'],
            'view-order'  => ["superadmin", 'admin'],
            'create-payment'  => ["superadmin", 'admin'],
            'edit-payment'  => ["superadmin", 'admin'],
            'delete-payment'  => ["superadmin", 'admin'],
            'view-payment'  => ["superadmin", 'admin'],
            'create-review'  => ["superadmin", 'admin'],
            'edit-review'  => ["superadmin", 'admin'],
            'delete-review'  => ["superadmin", 'admin'],
            'view-review'  => ["superadmin", 'admin'],
            'create-cart'  => ["superadmin", 'admin'],
            'edit-cart'  => ["superadmin", 'admin'],
            'delete-cart'  => ["superadmin", 'admin'],
            'view-cart'  => ["superadmin", 'admin'],
        ];

        foreach ($permissions as $permission => $roles) {
            $permission = Permission::create([
                'name' => $permission,
            ]);

            $permission->assignRole($roles);
        }
    }
}
