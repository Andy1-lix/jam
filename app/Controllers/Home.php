<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return view('welcome_message');
    }
    public function masjid()
    {
        $data = [
            'title' => 'Jam Digital Fadhil'
        ];
        return view('pages/index', $data);
    }
}