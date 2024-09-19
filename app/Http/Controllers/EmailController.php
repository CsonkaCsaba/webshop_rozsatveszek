<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendWelcomeEmail(){
        $toEmail = 'csonkacsaba1986@gmail.com';
        $message = 'Ezúton köszöntjük webshopunk regisztrált vásárlói között!';
        $subject = 'Sikeres regisztráció!';

        $response = Mail::to($toEmail)->send(new WelcomeEmail($message, $subject));
        dd($response);

    }
}
