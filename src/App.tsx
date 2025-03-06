import './App.css';
import { Provider } from 'react-redux';
import LibraryReservationApp from './app/LibraryReservationApp';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <LibraryReservationApp />
        </Provider>
    );
}

export default App;
