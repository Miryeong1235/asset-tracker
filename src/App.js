import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SignIn from './components/SignIn';
import logo from './inu-test.JPG';
import './App.css';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignOut from './components/signOut';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);


  return (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} />

        <Header />

        <Routes>
          <Route
            path="/signin"
            element={<SignIn />} />

          <Route
            path="/"
            element={currentUser ? <Main /> : <SignIn />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
