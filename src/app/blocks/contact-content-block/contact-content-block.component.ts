import { Component, Input, ViewChild, signal, inject, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SanityBlock } from '../block.types';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

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
export class ContactContentBlockComponent {
  @Input() block: SanityBlock;
  @ViewChild('contactForm') private contactForm!: NgForm;

  private http = inject(HttpClient);
  private transloco = inject(TranslocoService);

  protected formData = signal<ContactForm>({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  protected isSubmitting = signal(false);
  protected submitMessage = signal<{ type: string; text: string } | null>(null);

  protected async submitForm(): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.submitMessage.set(null);
    const data = this.formData();
    try {
      await firstValueFrom(
        this.http.post(`${environment.functionsBaseUrl}/contactForm`, {
          name: data.name, email: data.email, phone: data.phone,
          company: data.company, service: data.service, message: data.message,
        })
      );
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
