import {act, render} from '@testing-library/react';

import App from './App';

it('Renders App without errors', async () => {
  await act(async () => {
    render(<App />);
  });
});
