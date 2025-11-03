import React from "react";
import { builder } from "@builder.io/sdk";
import Head from "next/head";
import { RenderBuilderContent } from '../../../components/builder';

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);


export default async function ProductEditorial(props) {
  const content = await builder
    .get("product-details", {
      prerender: false,
      userAttributes: {
        urlPath: `/products/${props.params.product}`,
        // Allow targeting a section by a specific product ID (or perhaps handle)
        productId: props.params.product,
        // Optionally, allow targeting any product in a collection
        collection: props.params.collection
      }
    })
    .toPromise();

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      <RenderBuilderContent content={content} />
  
    </>
  );
}