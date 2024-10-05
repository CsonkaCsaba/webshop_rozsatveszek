<?php

namespace App\Http\Controllers;

use App\Mail\ThankYouOrderEmail;
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

    public function sendThankYouOrderEmail($id, $email, $name, $orderedProducts,  $billingAddress, $shippingAddress, $total){
        $id = $id;
        $toEmail = $email;
        $mailSubject = 'Köszönjük a rendelését!';
        $userName = $name;
        $products = $orderedProducts;
        $billingAddress =  $billingAddress; 
        $shippingAddress = $shippingAddress;
        $total = $total;

        $response = Mail::to($toEmail)->send(new ThankYouOrderEmail($id, $mailSubject, $userName, $products, $billingAddress, $shippingAddress, $total));
        // dd($response);

    }
}
