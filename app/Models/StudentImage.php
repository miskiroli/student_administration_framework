<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentImage extends Model
{
    protected $fillable = ['student_id', 'image_url', 'image_name'];

    public function student(){
        return $this->belongsTo(Student::class);
    }
    use HasFactory;
}
