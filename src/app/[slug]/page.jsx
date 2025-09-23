export const revalidate = 60;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `https://cdn.builder.io/api/v1/pages?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}`
    );
    if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
      console.warn('Builder.io API returned HTML or error page');
      return [];
    }

    const json = await res.json();
    return json.map((page) => ({
      slug: page.data?.url?.replace('/', '') || 'home',
    }));
  } catch (err) {
    console.error('Error in generateStaticParams:', err);
    return [];
  }
}
