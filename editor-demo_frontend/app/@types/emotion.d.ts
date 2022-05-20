import {CSSInterpolation} from '@emotion/serialize';

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation;
  }

  // The inline svg css prop
  interface SVGProps<T = SVGSVGElement> extends SVGProps<T> {
    css?: CSSInterpolation;
  }
}
