<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    function groups(){
        return $this->belongsToMany(Groups::class, 'group_student', 'student_id', 'group_id');
    }
    protected $fillable = ['name', 'sex', 'birth_place', 'birth_date'];
    public function images()
    {
        return $this->hasMany(StudentImage::class);
    }
}
