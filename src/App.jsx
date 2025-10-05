import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import store from './utils/appStore';
import { Provider } from 'react-redux';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connections from './components/Connections';
import ConnectionRequest from './components/ConnectionRequest';
import Chat from './components/Chat';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connecions" element={<Connections />} />
            <Route path="/requests" element={<ConnectionRequest />} />
            <Route path="/chat/:targetId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
