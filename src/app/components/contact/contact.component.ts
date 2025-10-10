import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  protected formData = signal<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  protected isSubmitting = signal(false);
  protected submitMessage = signal<{type: string, text: string} | null>(null);

  protected submitForm() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.submitMessage.set(null);

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitMessage.set({
        type: 'success',
        text: 'Mesajul a fost trimis cu succes! Vă vom contacta în cel mai scurt timp.'
      });

      // Reset form after successful submission
      this.formData.set({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage.set(null);
      }, 5000);
    }, 2000);
  }
}
