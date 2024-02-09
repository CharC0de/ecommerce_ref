<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function create(Request $request)
    {

        $email = $request->input('email');
        $name = $request->input('name');
        if (User::where('name', $name)->first()) {
            return response()->json(['message' => 'Username is Already taken', 'UNAMETAKEN' => true]);
        }
        if (User::where('email', $email)->first()) {
            return response()->json(['message' => 'Email is Already taken', 'EMAILTAKEN' => true]);
        }
        $data = $request->all();
        $user = new User;
        $user->fill($data);
        $user->save();
        return response()->json(['message' => 'Registration Success', 'SUCCESS' => true]);
    }
    function login(Request $request)
    {
        $user = $request->input('user');
        $password = $request->input('password');
        if ($data = $this->readAuth($user, $password)) {
            return response()->json(['ISAUTHENTICATED' => true, 'message' => 'User is Authenticated', 'data' => $data]);
        } else {
            return response()->json(['ISAUTHENTICATED' => false, 'message' => 'Invalid Credentials']);
        }
    }
    function readAuth($user, $password)
    {
        $data = User::where(function ($query) use ($user) {
            $query->where('name', $user)->orWhere('email', $user);
        })->first();
        if ($data && Hash::check($password, $data->password)) {
            return $data;
        }

        return null;
    }
    function read()
    {
        $users = User::all();
        return response()->json(['message' => 'GET users is successful', 'users' => $users]);
    }

    function delete($id)
    {
        $data = User::find($id);

        if ($data) {
            $data->delete();
            return response()->json(['Message' => 'DELETE user is Successful', 'deletedId' => $id]);
        } else {
            return response()->json(['Message' => "Data does not exist", 'deletedId' => $id]);
        }
    }
    function update(Request $request, $id)
    {

        $data = User::find($id);
        $email = $request->input('email');
        $name = $request->input('name');
        if (User::where('name', $name)->first()) {
            return response()->json(['message' => 'Username is Already taken', 'UNAMETAKEN' => true]);
        }
        if (User::where('email', $email)->first()) {
            return response()->json(['message' => 'Email is Already taken', 'EMAILTAKEN' => true]);
        }
        if ($data) {
            $data->update($request->except('password'));
            if ($request->has('password')) {
                $data->update(['password' => Hash::make($request->input('password'))]);
            }
            return response()->json(['Message' => 'PATCH user is Successful', 'updatedId' => $id]);
        } else {
            return response()->json(['Message' => "Data does not exist", 'updatedId' => $id]);
        }
    }
}