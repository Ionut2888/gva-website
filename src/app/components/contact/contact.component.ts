import { Component, signal, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../emailjs.config';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

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
  imports: [CommonModule, FormsModule, MatIconModule, TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') private contactForm!: NgForm;
  private transloco = inject(TranslocoService);

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
        text: this.transloco.translate('contact.success_msg')
      });

      // Reset signal values (always works, including in unit tests)
      const empty = { name: '', email: '', phone: '', company: '', service: '', message: '' };
      this.formData.set(empty);
      // Also reset Angular form state (touched/dirty) when the view is available
      this.contactForm?.resetForm(empty);

      setTimeout(() => this.submitMessage.set(null), 5000);
    } catch {
      this.submitMessage.set({
        type: 'error',
        text: this.transloco.translate('contact.error_msg')
      });
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
