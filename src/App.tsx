import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { DragNDropPlayground } from './features/drag-n-drop/DragNDropPlayground';
import { theme } from './styles/theme';
function App() {
  const [count, setCount] = useState(0);

  return <div className="App">dnd app - random numbers init commit</div>;
}

export default App;
