import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './lib/store/store';
import { router } from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </Provider>
  );
}

export default App;
