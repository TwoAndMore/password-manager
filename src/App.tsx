import './App.scss';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { User } from './types/User';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const userStorage = userInfo ? JSON.parse(userInfo) : null;

    setUser(userStorage);
  }, []);

  return (
    <>
      <NavBar />

      <main className="main">
        <div className="container">
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/home" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
              </>
            )}

            <Route path="*" element={<h1>Error :(</h1>} />
          </Routes>
        </div>
      </main>
    </>
  );
};
