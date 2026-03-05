import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  aggregateRatingSchema,
} from '@/lib/schema';

/**
 * Schema.org JSON-LD markup for SEO and AI understanding
 * Renders structured data in the document head
 */
export function SchemaMarkup() {
  const schemas = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    serviceSchema,
    faqSchema,
    aggregateRatingSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
