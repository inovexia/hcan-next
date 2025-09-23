
export async function generateStaticParams() {
  try {
    const res = await fetch(
      'https://cdn.builder.io/api/v1/pages?apiKey=f05495fc44c140dcb534bf29c4f1e9db'
    );
    if (!res.ok) {
      console.error('Failed to fetch Builder.io pages:', res.statusText);
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

