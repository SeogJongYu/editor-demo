import {act, render} from '@testing-library/react';

import WebApp from './WebApp';

it('Renders WebApp without errors', async () => {
  await act(async () => {
    render(<WebApp />);
  });
});
