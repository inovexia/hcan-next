"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Loader from "./components/Loader";
import Page from "./app/[...builder]/page";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./app/products/[slug]/page";
import ProductRegister from "./components/Product/ProductRegister";
import ProductSlider from "./components/Product/ProductSlider";
import StatamicProduct from "./components/StatamicProduct";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(Counter, {
  name: "Counter",
});

Builder.registerComponent(ProductGrid, {
  name: "ProductGrid",
  inputs: [
    {
      name: "heading",
      type: "text",
      defaultValue: "All Products",
    },
  ],
});

Builder.registerComponent(ProductGrid, {
  name: "ProductGrid",
});

Builder.registerComponent(Page, {
  name: "Page",
});

Builder.registerComponent(Loader, {
  name: "Loader",
});

Builder.registerComponent(Builder, {
  name: "Builder",
});

Builder.registerComponent(ProductPage, {
  name: "ProductPage",
});

Builder.registerComponent(ProductRegister, {
  name: "ProductRegister",
});

Builder.registerComponent(StatamicProduct, {
  name: "StatamicProduct",
});

Builder.registerComponent(ProductPage, {
  name: "Product page",
  inputs: [
    {
      name: "slug",
      type: "text",
      defaultValue: "",
      helperText: "Dynamic product slug",
    },
  ],
});
Builder.registerComponent(ProductSlider, {
  name: 'ProductSlider',
  inputs: [
    { name: 'thumbnail', type: 'text', friendlyName: 'Thumbnail URL' },
    {
      name: 'images',
      type: 'list',
      subFields: [{ name: 'image', type: 'text' }],
    },
  ],
});
