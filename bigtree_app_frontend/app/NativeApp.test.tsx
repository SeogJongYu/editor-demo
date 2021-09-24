import {act, render} from '@testing-library/react';

import NativeApp from './NativeApp';

it('Renders Native App without errors', async () => {
  await act(async () => {
    render(<NativeApp />);
  });
});
