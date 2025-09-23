export const revalidate = 60;
export const dynamic = 'force-static';
export default async function Page({ params }) {
  const slug = params?.slug || 'home';

  const res = await fetch(
    `https://cdn.builder.io/api/v1/page/${slug}?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}`
  );
  const builderContent = await res.json();
  if (!builderContent || !builderContent.data) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Page not found or content missing.
      </div>
    );
  }

  return <BuilderComponent content={builderContent} model='page' />;
}
