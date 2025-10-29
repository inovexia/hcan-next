"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Loader from "./components/Loader";
import Page from "./app/[...builder]/page";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./app/product/[slug]/page";
import ProductRegister from "./components/Product/ProductRegister";

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
