<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Rendeles;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NewOrder implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $orders;
    public $user;
    public function __construct()
    {
       
        
    }

    public function broadcastWith()
    {
         //echo"broadcastWith";
        return  ['last_order'=>'last_order'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
    */

    public function broadcastOn() 
    {
        return new Channel ('rendeles');
    }
}
