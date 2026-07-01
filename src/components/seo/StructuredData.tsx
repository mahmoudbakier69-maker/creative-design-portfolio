interface StructuredDataProps {
  data: Record<string, unknown>;
}

/** Safe JSON-LD injection — data must be server-built from trusted static values. */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
