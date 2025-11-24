'use client';
import { builder, BuilderComponent } from '@builder.io/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '../../../../components/Loader';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const path = '/blog/' + slug;
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function loadBlog() {
  //     const result = await builder
  //       .get('blog', { userAttributes: { path } })
  //       .toPromise();
  //     setContent(result);
  //   }
  //   if (path) loadBlog();
  // }, [path]);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const result = await builder
          .get('blogs', {
            userAttributes: {
              urlPath: path, // 👈 key part
            },
          })
          .toPromise();

        console.log('Fetching blog for:', path);
        console.log('Builder result:', result);

        setContent(result);
      } catch (err) {
        console.error('Builder fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (path) fetchContent();
  }, [path]);


  console.log(path);
  console.log(content)

  if (!content) return <Loader />;

  return <BuilderComponent model='blogs' content={content} />;
}
