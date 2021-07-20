<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;

class UserController extends Controller
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

    public function index()
    {
        $users = new UserCollection(User::all());
        return response()->json(compact('users'));
    }

    public function show($id)
    {
        $user = new UserResource(User::findOrFail($id));
        return response()->json(compact('user'));
    }

    public function edit(Request $request)
    {
        // validate fields that are always required
        $validated = $request->validate([
            'id'    =>  'required',
            'email' => 'required|email',
            'name' => 'required',
        ]);

        // check for password fields
        $new_password = null;
        if ($request->input('password') != "" && $request->input('password') != null) {
            $password_validated = $request->validate([
                'password'    =>  'required',
                'passwordConfirmation' => 'required|same:password',
            ]);
            $new_password = $request->input('password');
        }


        $user = User::where('id', '=', $request->input('id'))->firstOrFail();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if (isset($new_password)) {
            $user->password = $new_password;
        }
        $user->save();

        return response()->json(compact('user'));

    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:App\User,email',
            'name' => 'required',
            'password' => 'required',
            'passwordConfirmation' =>'required|same:password'
        ]);

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->email_verified_at = now();
        $user->save();

        return response()->json(compact('user'));
    }

    public function destroy($id) 
    {
        $user = User::where('id', '=', $id)->firstOrFail();
        $user->delete();
        return response()->json(compact('user'));
    }
}
