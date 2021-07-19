<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\CompanyCollection;

class CompanyController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = new CompanyCollection(Company::all());
        return response()->json(compact('companies'));
    }

     /**
     * Display the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $company = new CompanyResource(Company::findOrFail($id));
        return response()->json(compact('company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // validate fields that are always required
        $validated = $request->validate([
            'id'    =>  'required',
            'name' => 'required',
        ]);

        $company = Company::where('id', '=', $request->input('id'))->firstOrFail();
        $company->name = $request->input('name');
        $company->save();

        return response()->json(compact('company'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
        ]);

        $company = new Company;
        $company->name = $request->input('name');
        $company->save();

        return response()->json(compact('company'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $company = Company::where('id', '=', $id)->firstOrFail();
        $company->delete();
        return response()->json(compact('company'));
    }
}
