import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="nf">
      <div class="nf-inner">
        <p class="nf-code">404</p>
        <h1 class="nf-title">Pagina nu a fost găsită</h1>
        <p class="nf-text">
          Link-ul pe care l-ai accesat nu există sau a fost mutat.
        </p>
        <a routerLink="/home" class="nf-btn">Înapoi la pagina principală</a>
      </div>
    </section>
  `,
  styles: [`
    .nf {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--s8) var(--s4);
      text-align: center;
    }
    .nf-code {
      font-family: var(--fh);
      font-size: clamp(4rem, 14vw, 9rem);
      font-weight: 800;
      line-height: 1;
      margin: 0;
      color: var(--blue);
      letter-spacing: -0.04em;
    }
    .nf-title {
      font-family: var(--fh);
      font-size: clamp(1.5rem, 4vw, 2.25rem);
      font-weight: 800;
      margin: var(--s3) 0 0;
      color: var(--navy);
    }
    .nf-text {
      font-family: var(--fb);
      color: var(--navy-dim);
      margin: var(--s2) 0 var(--s5);
      max-width: 460px;
    }
    .nf-btn {
      display: inline-block;
      background: var(--blue);
      color: var(--white);
      font-family: var(--fh);
      font-weight: 700;
      padding: var(--s3) var(--s5);
      border-radius: var(--r-sm);
      transition: background var(--t-fast);
    }
    .nf-btn:hover { background: var(--navy); }
  `],
})
export class NotFoundComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('404 — Pagina nu a fost găsită');
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}
