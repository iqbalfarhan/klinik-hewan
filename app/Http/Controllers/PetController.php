<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use App\Http\Requests\BulkUpdatePetRequest;
use App\Http\Requests\BulkDeletePetRequest;
use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index pet");
        
        $data = Pet::query()
            ->with(['customer', 'category'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('pet/index', [
            'pets' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create pet"),
                'canShow' => $this->user->can("show pet"),
                'canUpdate' => $this->user->can("update pet"),
                'canDelete' => $this->user->can("delete pet"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePetRequest $request)
    {
        $this->pass("create pet");

        $data = $request->validated();
        Pet::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        $this->pass("show pet");

        if ($this->user->cannot('show pet', Pet::class)) {
            return abort(403);
        }

        return Inertia::render('pet/show', [
            'pet' => $pet,
            'permissions' => [
                'canUpdate' => $this->user->can("update pet"),
                'canDelete' => $this->user->can("delete pet"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePetRequest $request, Pet $pet)
    {
        $this->pass("update pet");

        $data = $request->validated();
        $pet->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        $this->pass("delete pet");

        $pet->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdatePetRequest $request)
    {
        $this->pass("update pet");

        $data = $request->validated();
        Pet::whereIn('id', $data['pet_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeletePetRequest $request)
    {
        $this->pass("delete pet");

        $data = $request->validated();
        Pet::whereIn('id', $data['pet_ids'])->delete();
    }

    
    
    
}
