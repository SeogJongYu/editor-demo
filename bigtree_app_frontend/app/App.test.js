import React from 'react';
import {act, render} from '@testing-library/react';

import App from './App';
import NativeApp from './App.native';

it('Renders App without errors', async () => {
  await act(async () => {
    render(<App />);
  });
});

it('Renders Native App without errors', async () => {
  await act(async () => {
    render(<NativeApp />);
  });
});
