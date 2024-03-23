<?php

use App\Http\Controllers\GroupsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students/create', [StudentController::class, 'create']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);


Route::get('/studygroups',[GroupsController::class, 'index']);
Route::post('/studygroups/create', [GroupsController::class, 'create']);
Route::get('/studygroups/{id}', [GroupsController::class, 'show']);
Route::put('/studygroups/{id}', [GroupsController::class, 'update']);
Route::delete('/studygroups/{id}', [GroupsController::class, 'delete']);


Route::post('/students/{id}/image', [StudentController::class, 'uploadImage']);

Route::get('/total-students-in-groups', [StudentController::class, 'totalStudentsInGroups']);

