<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groups extends Model
{
    use HasFactory;

    function students(){
        return $this->belongsToMany(Student::class, 'group_student', 'group_id', 'student_id');
       

    }
    protected $fillable = ['name', 'leader', 'subject'];
}
