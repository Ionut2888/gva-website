// EmailJS configuration
// Sign up at https://www.emailjs.com and fill in these values:
//
//  1. PUBLIC_KEY   → Account → API Keys → Public Key
//  2. SERVICE_ID   → Email Services → (your Gmail service) → Service ID
//  3. TEMPLATE_ID  → Email Templates → (your template) → Template ID

export const EMAILJS_CONFIG = {
  PUBLIC_KEY:  'YOUR_PUBLIC_KEY',   // e.g. 'abc123XYZ'
  SERVICE_ID:  'YOUR_SERVICE_ID',   // e.g. 'service_xxxxxxx'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',  // e.g. 'template_xxxxxxx'
} as const;
