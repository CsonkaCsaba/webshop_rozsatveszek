<?php

namespace App\Events;

use App\Models\Rendeles;
use Illuminate\Broadcasting\Channel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class OrderCreated implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public $order;

    public function __construct(Rendeles $order)
    {
        $this->order = $order;
        //Log::info('Order created from Event: ' . $order->id);
    }

    public function broadcastOn(): array
    {
       // Log::info('Broadcasting on channel: orders');
        return [
            new Channel('orders')
        ];
    }
    public function broadcastAs()
  {
      return 'OrderCreated';
  }

}
