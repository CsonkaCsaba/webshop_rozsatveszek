<?php

namespace App\Http\Controllers;

use App\Mail\updateStatusEmail;
use App\Mail\WelcomeEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendWelcomeEmail($email){
        $toEmail = $email;
        $message = 'Ezúton köszöntjük webshopunk regisztrált vásárlói között!';
        $subject = 'Sikeres regisztráció!';

        $response = Mail::to($toEmail)->send(new WelcomeEmail($message, $subject));
        // dd($response);

    }

    public function sendUpdateEmail($email, $name, $status){
        $toEmail = $email;
        $mailMessage = 'Ezúton értesítjük, hogy rendelésének állapota megváltozott!';
        $mailSubject = 'Rendelésének állapota megváltozott!';
        $userName = $name;
        $orderStatus = $status;

        $response = Mail::to($toEmail)->send(new UpdateStatusEmail($mailMessage, $mailSubject, $userName, $orderStatus));
        // dd($response);

    }
}
