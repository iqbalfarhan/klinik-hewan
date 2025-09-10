<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicalRequest;
use App\Http\Requests\UpdateMedicalRequest;
use App\Http\Requests\BulkUpdateMedicalRequest;
use App\Http\Requests\BulkDeleteMedicalRequest;
use App\Models\Medical;
use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MedicalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index medical");
        
        $data = Medical::query()
            ->with(['user', 'pet', 'pet.customer', 'pet.category'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('medical/index', [
            'medicals' => $data->get(),
            'query' => $request->input(),
            'pets' => Pet::with(['category'])->get(),
            'permissions' => [
                'canAdd' => $this->user->can("create medical"),
                'canShow' => $this->user->can("show medical"),
                'canUpdate' => $this->user->can("update medical"),
                'canDelete' => $this->user->can("delete medical"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicalRequest $request)
    {
        $this->pass("create medical");

        $data = $request->validated();
        $data['user_id'] = $this->user->id;

        Medical::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Medical $medical)
    {
        $this->pass("show medical");

        if ($this->user->cannot('show medical', Medical::class)) {
            return abort(403);
        }

        return Inertia::render('medical/show', [
            'medical' => $medical,
            'permissions' => [
                'canUpdate' => $this->user->can("update medical"),
                'canDelete' => $this->user->can("delete medical"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalRequest $request, Medical $medical)
    {
        $this->pass("update medical");

        $data = $request->validated();
        $medical->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medical $medical)
    {
        $this->pass("delete medical");

        $medical->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateMedicalRequest $request)
    {
        $this->pass("update medical");

        $data = $request->validated();
        Medical::whereIn('id', $data['medical_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteMedicalRequest $request)
    {
        $this->pass("delete medical");

        $data = $request->validated();
        Medical::whereIn('id', $data['medical_ids'])->delete();
    }

    
    
    
}
