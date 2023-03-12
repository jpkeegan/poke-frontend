import React from 'react';
import { HomePage } from './Components/pages/home-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PokeDetailsPage } from './Components/pages/poke-details-page';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return <>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/pokemon/:id' element={<PokeDetailsPage/>}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </>;
}

export default App;
