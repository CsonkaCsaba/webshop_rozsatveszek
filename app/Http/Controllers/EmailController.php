<?php

namespace App\Http\Controllers;

use App\Mail\ThankYouOrderEmail;
use App\Mail\updateStatusEmail;
use App\Mail\WelcomeEmail;
use App\Mail\UpdateRoleEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendWelcomeEmail($email){
        $toEmail = $email;
        $message = 'Email címének megerősítését követően köszöntjük webshopunk regisztrált vásárlói között!';
        $subject = 'Sikeres regisztráció!';

        $response = Mail::to($toEmail)->send(new WelcomeEmail($message, $subject));

    }

    public function sendUpdateEmail($email, $name, $status){
        $toEmail = $email;
        $mailMessage = 'Ezúton értesítjük, hogy rendelésének állapota megváltozott!';
        $mailSubject = 'Rendelésének állapota megváltozott!';
        $userName = $name;
        $orderStatus = $status;

        $response = Mail::to($toEmail)->send(new UpdateStatusEmail($mailMessage, $mailSubject, $userName, $orderStatus));


    }

    public function sendThankYouOrderEmail($id, $email, $name, $orderedProducts,  $billingAddress, $shippingAddress, $total, $comment, $pay, $szallitas){
        $id = $id;
        $toEmail = $email;
        $mailSubject = 'Köszönjük a rendelését!';
        $userName = $name;
        $products = $orderedProducts;
        $billingAddress =  $billingAddress; 
        $shippingAddress = $shippingAddress;
        $total = $total;
        $comment = $comment;
        $pay = $pay;
        $szallitas = $szallitas;

        $response = Mail::to($toEmail)->send(new ThankYouOrderEmail($id, $mailSubject, $userName, $products, $billingAddress, $shippingAddress, $total, $comment, $pay, $szallitas));

    }

    public function sendUpdateRoleEmail($email, $name, $role){
        $toEmail = $email;
        $mailSubject = 'Szerepköröd módosításra került!';
        $mailMessage = 'Ezúton értesítünk, hogy szerepköröd megváltozott!';
        $userName = $name;
        $userRole = $role;

        $response = Mail::to($toEmail)->send(new UpdateRoleEmail($mailMessage, $mailSubject, $userName, $userRole));
    }
}
