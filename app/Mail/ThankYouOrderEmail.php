<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ThankYouOrderEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $id;
    public $subject;
    public $name;
    public $products;
    public $billingAddress;
    public $shippingAddress;
    public $total;
    public $comment;
    public $pay;
    public $szallitas;

    /**
     * Create a new message instance.
     */
    public function __construct($id, $mailSubject, $userName, $products, $billingAddress, $shippingAddress, $total, $comment, $pay, $szallitas)
    {
        $this->id = $id;
        $this->subject = $mailSubject;
        $this->name = $userName;
        $this->products = $products;
        $this->billingAddress = $billingAddress;
        $this->shippingAddress = $shippingAddress;
        $this->total = $total;
        $this->comment = $comment;
        $this->pay = $pay;
        $this->szallitas = $szallitas;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Köszönjük rendelésed!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail-template.thank-you-order',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
