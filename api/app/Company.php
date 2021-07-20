<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'companies';

    protected $with = ['users'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'users'
    ];

    /**
     * The companies that the user belongs to.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
