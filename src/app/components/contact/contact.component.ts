import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../emailjs.config';

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
export class ContactComponent implements OnInit {
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

  ngOnInit(): void {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }

  protected async submitForm() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.submitMessage.set(null);

    const data = this.formData();

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name:    data.name,
          from_email:   data.email,
          phone:        data.phone,
          company:      data.company,
          service_type: data.service,
          message:      data.message,
          to_email:     'ionutgardu28@gmail.com',
        }
      );

      this.submitMessage.set({
        type: 'success',
        text: 'Mesajul a fost trimis cu succes! Vă vom contacta în cel mai scurt timp.'
      });

      this.formData.set({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });

      setTimeout(() => this.submitMessage.set(null), 5000);
    } catch {
      this.submitMessage.set({
        type: 'error',
        text: 'A apărut o eroare la trimiterea mesajului. Vă rugăm să ne contactați direct la auto@gvaverkaufer.ro.'
      });
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
