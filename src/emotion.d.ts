import '@emotion/react';

import { theme } from './styles/theme';

type ThemeType = typeof theme;
declare module '@emotion/react' {
  // this will declare theme with auto infer - keep this as it is
  // eslint-disable-next-line
  export interface Theme extends ThemeType {}
}
