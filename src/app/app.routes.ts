import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'services', 
    loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent) 
  },
  { 
    path: 'fleet', 
    loadComponent: () => import('./components/fleet/fleet.component').then(m => m.FleetComponent) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) 
  },
  {
    path: 'terms',
    loadComponent: () => import('./components/legal/legal.component').then(m => m.LegalComponent),
    data: { page: 'terms' }
  },
  {
    path: 'privacy',
    loadComponent: () => import('./components/legal/legal.component').then(m => m.LegalComponent),
    data: { page: 'privacy' }
  },
  {
    path: 'cookies',
    loadComponent: () => import('./components/legal/legal.component').then(m => m.LegalComponent),
    data: { page: 'cookies' }
  },
  { path: '**', redirectTo: '/home' }
];
