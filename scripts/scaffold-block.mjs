/**
 * New content-block scaffolder.
 *
 * Generates a standalone Angular block component + spec, appends its Sanity
 * schema, and wires all four registration points:
 *   1. studio/schemaTypes/blockSchemas.ts   (schema definition)
 *   2. studio/schemaTypes/index.ts          (import + schemaTypes array)
 *   3. studio/schemaTypes/pageSchema.ts     (sections `of:` array)
 *   4. src/app/blocks/block-renderer.component.ts (import + imports[] + @case)
 *
 * Idempotent: skips a file that already references the block. If an anchor has
 * moved, it prints the exact snippet to paste instead of corrupting the file.
 *
 * Usage:  node scripts/scaffold-block.mjs <block-name>
 *   e.g.  node scripts/scaffold-block.mjs testimonials
 *         node scripts/scaffold-block.mjs "Logo Wall"
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const raw = process.argv[2];
if (!raw) {
  console.error('Usage: node scripts/scaffold-block.mjs <block-name>');
  process.exit(1);
}

// ── Naming ──────────────────────────────────────────────────────────────────
const base = raw.trim().toLowerCase()
  .replace(/block$/i, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
const words = base.split('-').filter(Boolean);
const pascal = words.map((w) => w[0].toUpperCase() + w.slice(1)).join('');
const camel = pascal[0].toLowerCase() + pascal.slice(1);

const folder = `${base}-block`;
const selector = `app-${base}-block`;
const className = `${pascal}BlockComponent`;
const schemaName = `${camel}Block`;       // e.g. testimonialsBlock
const schemaConst = `${camel}Block`;
const title = words.map((w) => w[0].toUpperCase() + w.slice(1)).join(' ') + ' Block';

const DIR = `src/app/blocks/${folder}`;
const report = [];

// ── 1. Component + spec ───────────────────────────────────────────────────────
if (existsSync(DIR)) {
  report.push(`• component dir ${DIR} already exists — skipped`);
} else {
  mkdirSync(DIR, { recursive: true });
  writeFileSync(`${DIR}/${folder}.component.ts`, componentSrc());
  writeFileSync(`${DIR}/${folder}.component.spec.ts`, specSrc());
  report.push(`✔ created ${DIR}/${folder}.component.ts`);
  report.push(`✔ created ${DIR}/${folder}.component.spec.ts`);
}

// ── 2–4. Registrations ────────────────────────────────────────────────────────
registerSchema();
registerSchemaIndex();
registerPageSchema();
registerRenderer();

// ── Report ────────────────────────────────────────────────────────────────────
console.log(`\nScaffolded "${schemaName}"\n${'─'.repeat(40)}`);
report.forEach((r) => console.log(r));
console.log(`\nSelf-verify checklist:`);
console.log(`  [ ] Fill in the schema fields in blockSchemas.ts for your content shape`);
console.log(`  [ ] Add all 8 langs (ro/de/en/fr/es/hu/it/nl) for any localized field`);
console.log(`  [ ] Flesh out the component template + styles`);
console.log(`  [ ] If it renders Sanity images, use the sanitySrc/sanitySrcset pipes`);
console.log(`  [ ] npm test  (the generated spec must pass / extend it)`);
console.log(`  [ ] cd studio && npx sanity deploy  (publish the schema)`);

// ── Helpers ───────────────────────────────────────────────────────────────────
function insertOnce(path, marker, anchor, addition, manualHint) {
  if (!existsSync(path)) { report.push(`⚠ ${path} not found — add manually:\n${manualHint}`); return; }
  let src = readFileSync(path, 'utf8');
  if (src.includes(marker)) { report.push(`• ${path} already references ${schemaName} — skipped`); return; }
  if (!src.includes(anchor)) {
    report.push(`⚠ ${path}: anchor not found — add manually:\n${manualHint}`);
    return;
  }
  src = src.replace(anchor, addition);
  writeFileSync(path, src);
  report.push(`✔ registered in ${path}`);
}

function registerSchema() {
  const path = 'studio/schemaTypes/blockSchemas.ts';
  if (!existsSync(path)) { report.push(`⚠ ${path} not found`); return; }
  let src = readFileSync(path, 'utf8');
  if (src.includes(`name: '${schemaName}'`)) { report.push(`• ${path} already defines ${schemaName} — skipped`); return; }
  src += `
export const ${schemaConst} = defineType({
  name: '${schemaName}', title: '${title}', type: 'object',
  fields: [
    ls('heading'),
    defineField({
      name: 'items', title: 'Items', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [ls('title'), lt('text')],
      })],
    }),
  ],
});
`;
  writeFileSync(path, src);
  report.push(`✔ appended schema to ${path}`);
}

function registerSchemaIndex() {
  const path = 'studio/schemaTypes/index.ts';
  insertOnce(path, `${schemaConst},`, `} from './blockSchemas';`,
    `  ${schemaConst},\n} from './blockSchemas';`,
    `  import: add "${schemaConst}," to the './blockSchemas' import and the schemaTypes array`);
  // array entry
  if (existsSync(path)) {
    let src = readFileSync(path, 'utf8');
    const arrAnchor = '\n];';
    if (src.lastIndexOf(`${schemaConst},\n];`) === -1 && src.includes(arrAnchor)) {
      src = src.replace(/\n\];\s*$/, `\n  ${schemaConst},\n];\n`);
      writeFileSync(path, src);
    }
  }
}

function registerPageSchema() {
  insertOnce('studio/schemaTypes/pageSchema.ts', `type: '${schemaName}'`,
    `{ type: 'contactContentBlock' },`,
    `{ type: 'contactContentBlock' },\n        { type: '${schemaName}' },`,
    `  pageSchema sections of:[]: add "{ type: '${schemaName}' },"`);
}

function registerRenderer() {
  const path = 'src/app/blocks/block-renderer.component.ts';
  if (!existsSync(path)) { report.push(`⚠ ${path} not found`); return; }
  let src = readFileSync(path, 'utf8');
  if (src.includes(className)) { report.push(`• ${path} already references ${className} — skipped`); return; }
  // Single-line, CRLF-safe anchors (the repo uses \r\n line endings).
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const importLine = `import { ContactContentBlockComponent }  from './contact-content-block/contact-content-block.component';`;
  const newImport = `import { ${className} } from './${folder}/${folder}.component';`;
  const arrEntry = `    ContactContentBlockComponent,`;
  const caseAnchor = `@case ('contactContentBlock') { <app-contact-content-block [block]="block" /> }`;
  const newCase = `@case ('${schemaName}') { <${selector} [block]="block" /> }`;
  if (src.includes(importLine) && src.includes(arrEntry) && src.includes(caseAnchor)) {
    src = src.replace(importLine, `${importLine}${eol}${newImport}`);
    src = src.replace(arrEntry, `${arrEntry}${eol}    ${className},`);
    src = src.replace(caseAnchor, `${caseAnchor}${eol}        ${newCase}`);
    writeFileSync(path, src);
    report.push(`✔ registered in ${path}`);
  } else {
    report.push(`⚠ ${path}: anchors moved — add manually:\n    import: ${newImport}\n    imports[]: ${className},\n    @switch: ${newCase}`);
  }
}

function componentSrc() {
  return `import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: '${selector}',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [\`
    .${base}-block { max-width: var(--mw); margin: 0 auto; padding: var(--s8) var(--s4); }
    .${base}-block__heading { font-family: var(--fh); font-size: clamp(1.5rem, 3vw, 2.25rem); color: var(--navy); }
    .${base}-block__grid { display: grid; gap: var(--s4); grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin-top: var(--s5); }
    .${base}-block__item-title { font-family: var(--fh); font-weight: 700; color: var(--navy); }
    .${base}-block__item-text { font-family: var(--fb); color: var(--navy-dim); margin-top: var(--s1); }
  \`],
  template: \`
    <section class="${base}-block" appAos="fade-up" [aosDuration]="1500">
      @if (block.heading) { <h2 class="${base}-block__heading">{{ block.heading }}</h2> }
      <div class="${base}-block__grid">
        @for (item of block.items; track item._key) {
          <div class="${base}-block__item">
            <div class="${base}-block__item-title">{{ item.title }}</div>
            <div class="${base}-block__item-text">{{ item.text }}</div>
          </div>
        }
      </div>
    </section>
  \`,
})
export class ${className} {
  @Input() block: SanityBlock;
}
`;
}

function specSrc() {
  return `import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ${className} } from './${folder}.component';

const BLOCK = {
  heading: 'Test Heading',
  items: [
    { _key: 'a', title: 'One', text: 'First item' },
    { _key: 'b', title: 'Two', text: 'Second item' },
  ],
};

describe('${className}', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${className}],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(${className});
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render heading and all items', () => {
    const fixture = TestBed.createComponent(${className});
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Test Heading');
    expect(el.querySelectorAll('.${base}-block__item').length).toBe(2);
  });
});
`;
}
