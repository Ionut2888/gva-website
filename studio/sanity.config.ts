import { defineConfig } from 'sanity';
import { structureTool, type DefaultDocumentNodeResolver } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { Iframe, type UrlResolver } from 'sanity-plugin-iframe-pane';
import { schemaTypes } from './schemaTypes';

const PREVIEW_BASE =
  (import.meta as any).env?.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:4200';

const previewUrl: UrlResolver = (doc) => {
  const slug = doc?.slug?.current;
  if (!slug) return PREVIEW_BASE;
  return slug === 'home' ? `${PREVIEW_BASE}/` : `${PREVIEW_BASE}/${slug}`;
};

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'page') {
    return S.document().views([
      S.view.form().title('Editor'),
      S.view
        .component(Iframe)
        .options({ url: previewUrl, defaultSize: 'desktop', reload: { button: true } })
        .title('Preview'),
    ]);
  }
  return S.document().views([S.view.form()]);
};

export default defineConfig({
  name: 'gva-studio',
  title: 'GVA Verkaufer CMS',
  projectId: 'es1eh557',
  dataset: 'production',
  auth: { loginMethod: 'token' },

  plugins: [
    structureTool({
      defaultDocumentNode,
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                S.documentList()
                  .title('Pages')
                  .apiVersion('2024-01-01')
                  .filter('_type == "page"')
                  .defaultOrdering([{ field: 'title', direction: 'asc' }]),
              ),
            S.divider(),
            S.listItem()
              .title('Translations')
              .child(
                S.documentList()
                  .title('Translations by language')
                  .apiVersion('2024-01-01')
                  .filter('_type == "translations"')
                  .defaultOrdering([{ field: 'locale', direction: 'asc' }]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
