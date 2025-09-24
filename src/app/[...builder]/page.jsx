'use client';
import { builder, BuilderComponent } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function BuilderCatchAllPage() {
  const params = useParams();
  const path = '/' + (params?.builder?.join('/') || '');

  const [content, setContent] = useState(null);

  useEffect(() => {
    builder
      .get('page', { url: path })
      .toPromise()
      .then((res) => setContent(res));
  }, [path]);

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <BuilderComponent model='page' content={content} />
    </div>
  );
}
