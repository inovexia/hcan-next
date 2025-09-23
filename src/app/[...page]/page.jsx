'use client';

import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function CatchAllPage() {
  const pathname = usePathname();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const builderContent = await builder
        .get('page', {
          userAttributes: {
            urlPath: pathname,
          },
        })
        .toPromise();
      setContent(builderContent);
      setLoading(false);
      console.log(builderContent);
    }

    fetchContent();
  }, [pathname]);

  if (loading) return <Loader />;
  if (!content) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100 flex-column text-center bg-light'>
        <h2 className='mb-2'>Page Not Found</h2>
        <p>This Builder.io page doesn’t exist or failed to load.</p>
      </div>
    );
  }


  return <BuilderComponent model='page' content={content} />;
}
