// `@types/mdx` is written against the *global* JSX namespace, but React 19's
// types declare JSX only as a module-scoped export from `react/jsx-runtime`.
// Without this shim `MDXComponents` and the MDX default export silently widen
// to `any` (skipLibCheck hides the error), losing all typing on the component
// map. Safe to declare: @types/react@19 has no global JSX to collide with.
import type { JSX as ReactJSX } from "react";

declare global {
  namespace JSX {
    type Element = ReactJSX.Element;
    type ElementType = ReactJSX.ElementType;
    type ElementClass = ReactJSX.ElementClass;
    type ElementAttributesProperty = ReactJSX.ElementAttributesProperty;
    type ElementChildrenAttribute = ReactJSX.ElementChildrenAttribute;
    type IntrinsicAttributes = ReactJSX.IntrinsicAttributes;
    type IntrinsicClassAttributes<T> = ReactJSX.IntrinsicClassAttributes<T>;
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
  }
}

export {};
