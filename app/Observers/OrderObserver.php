<?php

namespace App\Observers;
use Illuminate\Support\Facades\Log;
use App\Models\Rendeles;
use App\Events\OrderCreated;
class OrderObserver
{
    /**
     * Handle the Rendeles "created" event.
     */
    public function created(Rendeles $rendeles): void
    {
        event(new OrderCreated($rendeles));
        //Log::info('Order created from Observer: ' . $rendeles->id);
    }

    /**
     * Handle the Rendeles "updated" event.
     */
    public function updated(Rendeles $rendeles): void
    {
        //
    }

    /**
     * Handle the Rendeles "deleted" event.
     */
    public function deleted(Rendeles $rendeles): void
    {
        //
    }

    /**
     * Handle the Rendeles "restored" event.
     */
    public function restored(Rendeles $rendeles): void
    {
        //
    }

    /**
     * Handle the Rendeles "force deleted" event.
     */
    public function forceDeleted(Rendeles $rendeles): void
    {
        //
    }
}
