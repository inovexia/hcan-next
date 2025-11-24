"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Loader from "./components/Loader";
import PageEn from "./app/en/[...builder]/page";
import PageFr from "./app/fr/[...builder]/page";
import ProductGrid from "./components/ProductGrid";
import ProductPageEn from "./app/en/products/[slug]/page";
import ProductPageFr from "./app/fr/products/[slug]/page";
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

Builder.registerComponent(PageFr, {
  name: "Page",
});

Builder.registerComponent(PageEn, {
  name: "Page",
});

Builder.registerComponent(Loader, {
  name: "Loader",
});

Builder.registerComponent(Builder, {
  name: "Builder",
});

Builder.registerComponent(ProductPageEn, {
  name: "ProductPage",
});

Builder.registerComponent(ProductPageFr, {
  name: "ProductPage",
});

Builder.registerComponent(ProductRegister, {
  name: "ProductRegister",
});

Builder.registerComponent(StatamicProduct, {
  name: "StatamicProduct",
});

Builder.registerComponent(ProductPageEn, {
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

Builder.registerComponent(ProductPageFr, {
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
  name: "ProductSlider",
  inputs: [
    { name: "thumbnail", type: "text", friendlyName: "Thumbnail URL" },
    {
      name: "images",
      type: "list",
      subFields: [{ name: "image", type: "text" }],
    },
  ],
});

Builder.registerComponent(LanguageSwitcher, {
  name: "LanguageSwitcher",
});
