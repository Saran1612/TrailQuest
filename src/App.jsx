import '@mantine/core/styles.css';
import './App.css'
import { Home } from './components/home';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CharcaterInfo } from './components/charcaterInfo';


const theme = createTheme({
  /** Put your mantine theme override here */
});


function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/character/:id' element={<CharcaterInfo />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
