<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Requests\BulkUpdateCustomerRequest;
use App\Http\Requests\BulkDeleteCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index customer");
        
        $data = Customer::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('customer/index', [
            'customers' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create customer"),
                'canShow' => $this->user->can("show customer"),
                'canUpdate' => $this->user->can("update customer"),
                'canDelete' => $this->user->can("delete customer"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $this->pass("create customer");

        $data = $request->validated();
        Customer::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $this->pass("show customer");

        if ($this->user->cannot('show customer', Customer::class)) {
            return abort(403);
        }

        return Inertia::render('customer/show', [
            'customer' => $customer,
            'permissions' => [
                'canUpdate' => $this->user->can("update customer"),
                'canDelete' => $this->user->can("delete customer"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $this->pass("update customer");

        $data = $request->validated();
        $customer->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $this->pass("delete customer");

        $customer->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateCustomerRequest $request)
    {
        $this->pass("update customer");

        $data = $request->validated();
        Customer::whereIn('id', $data['customer_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteCustomerRequest $request)
    {
        $this->pass("delete customer");

        $data = $request->validated();
        Customer::whereIn('id', $data['customer_ids'])->delete();
    }

    
    
    
}
