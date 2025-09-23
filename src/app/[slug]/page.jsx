
export async function generateStaticParams() {
  const pages = await fetch(
    'https://cdn.builder.io/api/v1/pages?apiKey=f05495fc44c140dcb534bf29c4f1e9db'
  ).then((res) => res.json());
  return pages.map((page) => ({
    slug: page.data?.url?.replace('/', '') || 'home',
  }));
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default function Page({ params }) {
  
}
