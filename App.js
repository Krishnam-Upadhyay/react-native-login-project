import { Provider } from 'react-redux';
import Home from './Screens/Home';
import { store } from './Global/store';
 
export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}