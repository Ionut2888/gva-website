import { Component, Input, OnInit, ViewChild, signal, inject, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../emailjs.config';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

interface ContactForm {
  name: string; email: string; phone: string;
  company: string; service: string; message: string;
}

@Component({
  selector: 'app-contact-content-block',
  standalone: true,
  imports: [FormsModule, MatIconModule, TranslocoModule, AnimateOnScrollDirective],
  templateUrl: './contact-content-block.component.html',
  styleUrls: ['./contact-content-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactContentBlockComponent implements OnInit {
  @Input() block: SanityBlock;
  @ViewChild('contactForm') private contactForm!: NgForm;

  private transloco = inject(TranslocoService);

  protected formData = signal<ContactForm>({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  protected isSubmitting = signal(false);
  protected submitMessage = signal<{ type: string; text: string } | null>(null);

  ngOnInit(): void { emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY); }

  protected async submitForm(): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.submitMessage.set(null);
    const data = this.formData();
    try {
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        from_name: data.name, from_email: data.email, phone: data.phone,
        company: data.company, service_type: data.service, message: data.message,
        to_email: 'ionutgardu28@gmail.com',
      });
      this.submitMessage.set({ type: 'success', text: this.transloco.translate('contact.success_msg') });
      const empty = { name: '', email: '', phone: '', company: '', service: '', message: '' };
      this.formData.set(empty);
      this.contactForm?.resetForm(empty);
      setTimeout(() => this.submitMessage.set(null), 5000);
    } catch {
      this.submitMessage.set({ type: 'error', text: this.transloco.translate('contact.error_msg') });
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
