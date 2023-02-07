import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { DragAndDrop } from './features/drag-n-drop/DragNDropPlayground';
import { DragNDropPlaygroundContextProvider } from './features/drag-n-drop/DragNDropPlaygroundContext';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer className="App">
        <DragNDropPlaygroundContextProvider>
          <DragAndDrop />
        </DragNDropPlaygroundContextProvider>
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  background: ${(props) => props.theme.colors.darkBg};
  height: 100%;
`;

export default App;
