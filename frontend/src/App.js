import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null); // State to hold user data

  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve existing users or create empty array
    const existingUser = users.find(user => user.email === email); // Check if the user already exists

    if (!existingUser) {
      users.push({ email, password }); // Add new user
      localStorage.setItem('users', JSON.stringify(users)); // Save updated users array
      setUser({ email });
      alert('Registration successful! You can now log in.'); // Alert user on successful registration
    } else {
      alert('User already registered!'); // Alert if the user is already registered
    }
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve existing users
    const storedUser = users.find(user => user.email === email && user.password === password); // Check for valid credentials
    if (storedUser) {
      setUser({ email });
      return true; // Login successful
    }
    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} /> {/* Pass user and logout as props */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register register={register} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
