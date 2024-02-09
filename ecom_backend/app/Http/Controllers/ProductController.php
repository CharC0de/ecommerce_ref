<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    function create(Request $request)
    {
        $data = $request->all();
        $product = new Product;
        $product->fill($data);
        $product->save();
        return  response()->json(['message' => 'Insert Successful']);
    }
    function put(Request $request, $id)
    {
        $data = Product::find($id);

        if ($data) {
            $data->update($request->all());
            return response()->json(['Message' => 'PUT in existing Data is  Successful', 'id' => $id]);
        } else {
            $data = new Product;
            $data->create($request->all());
            return response()->json(['Message' => 'PUT in new Data is Successful', 'id' => $id]);
        }
    }
    function read()
    {
        $data = Product::all();
        return response()->json(['Message' => 'GET Data Access is Successful', 'products' => $data]);
    }
    function delete($id)
    {
        $data = Product::find($id);

        if ($data) {
            $data->delete();
            return response()->json(['Message' => 'DELETE product is Successful', 'deletedId' => $id]);
        } else {
            return response()->json(['Message' => "Data does not exist", 'deletedId' => $id]);
        }
    }
}