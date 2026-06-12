import { Component, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

const CONSENT_KEY = 'gva-cookie-consent';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  protected visible = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!localStorage.getItem(CONSENT_KEY)) {
      this.visible.set(true);
    }
  }

  protected accept(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(CONSENT_KEY, 'accepted');
    this.visible.set(false);
  }

  protected decline(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(CONSENT_KEY, 'declined');
    this.visible.set(false);
  }
}
