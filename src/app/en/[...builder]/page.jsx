'use client';
import { builder, BuilderComponent } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loader from '../../../components/Loader';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function BuilderCatchAllPage() {
  const params = useParams();
  const path = '/' + (params?.builder?.join('/') || '');

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchContent() {
    setLoading(true);
    try {
      const contentRes = await builder
        .get('page', {
          url: path
        })
        .toPromise()

      setContent(contentRes);
    } catch (err) {
      console.error('Builder fetch error:', err);
    } finally {
      setLoading(false);
    }
  }
  fetchContent();
}, [path])

  if (loading) return <Loader />;
  if (!content) return <div>Page not found</div>;
  return <BuilderComponent model='page' content={content} />;
}
