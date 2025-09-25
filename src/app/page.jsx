'use client';

import { useEffect, useState } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';
import Loader from '../components/Loader'; 

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function HomePage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    builder
      .get('page', { url: '/' })
      .toPromise()
      .then((data) => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (!content) return <div>Page not found</div>;

  return <BuilderComponent model='page' content={content} />;
}
