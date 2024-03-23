<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Groups;

class GroupsController extends Controller
{
    public function index()
    {
        $groups = Groups::all();

        return response()->json($groups);
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'leader' => 'required|string',
            'subject' => 'required|string',
        ]);

        $group = Groups::create($data);

        return response()->json(['message' => 'Group created successfully', 'group' => $group]);
    }

    public function update(Request $request, $id)
    {
        $group = Groups::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'required|string',
            'leader' => 'required|string',
            'subject' => 'required|string',
        ]);

        $group->update($data);

        return response()->json(['message' => 'Group updated successfully', 'group' => $group]);
    }
    public function show($id)
{
    $group = Groups::findOrFail($id);

    return response()->json($group);
}

    public function delete($id)
    {
        $group = Groups::findOrFail($id);
        $group->delete();

        return response()->json(['message' => 'Group deleted successfully']);
    }
}
