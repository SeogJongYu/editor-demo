import 'twin.macro';
import {styled as styledImport, css as cssImport} from '@emotion/react';

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
