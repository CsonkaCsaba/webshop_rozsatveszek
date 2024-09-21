<?php

namespace App\Listeners;
use App\Http\Controllers\EmailController;
use App\Mail\WelcomeEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;


class ClientWelcomeListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Verified $event)
    {
        $user = $event->user;
        if($user->hasVerifiedEmail()){
            app('App\Http\Controllers\EmailController')->sendWelcomeEmail($user->email);
            return redirect('/');
        }
    }
}
