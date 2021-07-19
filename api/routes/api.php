<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
    Route::post('signin', 'SignInController');
    Route::post('signout', 'SignOutController');
    
    Route::get('me', 'MeController');
});

Route::group(['prefix' => 'user', 'namespace' => 'User'], function () {
    Route::get('users', 'UserController@index');
    Route::get('show/{id}', 'UserController@show');
    Route::post('edit', 'UserController@editUser');
    Route::post('create', 'UserController@createUser');
    Route::post('delete/{id}', 'UserController@deleteUser');
});

Route::group(['prefix' => 'company'], function () {
    Route::get('index', 'CompanyController@index');
    Route::get('show/{id}', 'CompanyController@show');
    Route::post('create', 'CompanyController@store');
    Route::post('update', 'CompanyController@update');
    Route::post('destroy/{id}', 'CompanyController@destroy');
});