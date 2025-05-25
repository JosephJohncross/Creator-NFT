import { BrowserRouter, Routes } from 'react-router-dom';
import Provider from './providerMain';
import { CustomRoutes } from './routes/routes';


function App() {

  return (
    <>
      <BrowserRouter>
          <Provider>
            <Routes>{...CustomRoutes()}</Routes>
          </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
