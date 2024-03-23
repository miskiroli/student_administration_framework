<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\StudentImage;
class StudentController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');
    
        $query = Student::with('groups');
    
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    
        $students = $query->paginate($perPage);
    
        // Kép URL-jének hozzáadása a diákok adataihoz
        foreach ($students as $student) {
            $image = $student->images->first();
            $student->image_url = $image ? $image->image_url : null;
        }
    
        return response()->json($students);
    }

public function create(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'sex' => 'required|in:male,female',
        'birth_place' => 'required|string',
        'birth_date' => 'required|date',
        'study_group_id' => 'required|array',
        'study_group_id.*' => 'required|integer',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
    ]);

    // Diák létrehozása
    $student = new Student();
    $student->name = $request->name;
    $student->sex = $request->sex;
    $student->birth_place = $request->birth_place;
    $student->birth_date = $request->birth_date;
    $student->save();
    $student->groups()->attach($request->study_group_id);
    

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('public/images');
        $imageUrl = url(Storage::url($imagePath));
        
        $imageName = $request->file('image')->getClientOriginalName(); 

        $image = new StudentImage([
            'image_url' => $imageUrl,
            'image_name' => $imageName, 
        ]);
        
        $student->images()->save($image);
    }
    
    
    return response()->json([
        'message' => 'Student created successfully',
        'student' => $student,
        'student_id' => $student->id,
        'image' => [
            'url' => $imageUrl ?? null,
            'name' => $imageName ?? null, 
        ],
    ]);
}
   

public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string',
        'sex' => 'required|string',
        'birth_place' => 'required|string',
        'birth_date' => 'required|date',
        'groups' => 'array|max:4',
        'groups.*' => 'exists:groups,id',
    ]);

    $student = Student::findOrFail($id);
    $student->name = $request->input('name');
    $student->sex = $request->input('sex');
    $student->birth_place = $request->input('birth_place');
    $student->birth_date = $request->input('birth_date');

    $student->save();

    if ($request->has('groups')) {
        $student->groups()->sync($request->input('groups'));
    }

    return response()->json(['message' => 'Student updated successfully', 'student' => $student]);
}





public function uploadImage(Request $request, $id)
{
    // Ellenőrizd, hogy a diák létezik-e
    $student = Student::findOrFail($id);
    
    // Ellenőrizd, hogy a kép valóban egy képfájl
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
    ]);

    // Tárold el a képet és a kép URL-jét
    $imagePath = $request->file('image')->store('public/images');
    $imageUrl = url(Storage::url($imagePath));
    
    // Ellenőrizd, hogy a diáknak már van képe
    $imageName = $request->file('image')->getClientOriginalName();

    // Ellenőrizd, hogy a diákhoz már tartozik-e kép
    $existingImage = $student->images()->first();
    if ($existingImage) {
        // Frissítsd a meglévő képet
        $existingImage->update([
            'image_url' => $imageUrl,
            'image_name' => $imageName,
        ]);
    } else {
        // Ha nincs még képe a diáknak, hozz létre egy újat
        $image = new StudentImage([
            'image_url' => $imageUrl,
            'image_name' => $imageName,
        ]);
        $student->images()->save($image);
    }

    // Visszatéríti a kép URL-jét és nevét
    return response()->json([
        'message' => 'Image uploaded successfully',
        'image' => [
            'url' => $imageUrl,
            'name' => $request->file('image')->getClientOriginalName(),
        ],
    ]);
}





public function show($id)
{
    $student = Student::with('groups', 'images')->findOrFail($id); // Képek lekérése is

    // Kép URL-jének hozzáadása a diák adataihoz
    $student->image_url = $student->images->first()->image_url ?? null;

    return response()->json($student);
}



    public function destroy($id)
    {
        $student = Student::findOrFail($id);

        
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
    
    
    public function totalStudentsInGroups()
    {
        // Diákok számának lekérése, figyelembe véve, hogy minden diák csak egyszer szerepeljen
        $totalStudentsInGroups = Student::has('groups')->count();
    
        return response()->json(['total_students_in_groups' => $totalStudentsInGroups]);
    }
    
   }

