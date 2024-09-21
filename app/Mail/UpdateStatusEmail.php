<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UpdateStatusEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $mailMessage;
    public $subject;
    public $name;
    public $status;
    /**
     * Create a new message instance.
     */
    public function __construct($mailMessage, $mailSubject, $userName, $orderStatus)
    {
        $this->mailMessage = $mailMessage;
        $this->subject = $mailSubject;
        $this->name = $userName;
        $this->status = $orderStatus;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail-template.update-mail',
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
