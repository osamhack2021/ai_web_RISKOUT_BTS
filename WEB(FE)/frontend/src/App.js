import { useState } from 'react';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { SnackbarProvider, useSnackbar } from 'notistack';
import Layout from './components/Layout';

import Board from './pages/Board';
import DetectionStatus from './pages/DetectionStatus';
import Dashboard from './pages/Dashboard';
import RiskReport from './pages/RiskReport';

import LoginModal from './components/Modal/LoginModal';
import RegisterModal from './components/Modal/RegisterModal';
import PasswordResetModal from './components/Modal/PasswordResetModal';
import InitInfo from './components/Modal/InitInfo';
import './App.css';

const mdTheme = createTheme({
  typography: {
    fontFamily: [
      '"Nanum Gothic"',
      '"Source Sans Pro"',
      '"Noto Sans KR"',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#2d333b',
    },
    primary: {
      main: '#3a8ffb',
    },
    success: {
      main: 'rgb(40, 189, 139)',
    },
    warning: {
      main: 'rgb(255, 167, 37)',
    },
    error: {
      main: 'rgb(252, 85, 80)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(54,57,63)',
          backgroundImage: 'none',
        },
      },
    },
  },
});
console.log(mdTheme);

export default function App() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const history = useHistory();

  let [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  const userHasAuthenticated = (authenticated, username, token) => {
    setisAuthenticated(authenticated);
    setUser(username);
    console.log('토큰 저장됨');
    localStorage.setItem('token', token);
  }; 

  function handleLogout() {
    if (localStorage.getItem('token') && window.location.pathname == '/logout' ) {
      localStorage.removeItem('token');
      window.location.href="/"
    }
  }


  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Layout>
          <Route exact path="/presstrends">
            <Dashboard />
          </Route>

          <Route exact path="/detectionstatus">
            <DetectionStatus />
          </Route>

          <Route exact path="/riskreport">
            <RiskReport />
          </Route>

          <Route exact path="/login">
            <LoginModal
              setModal={setModal}
              userHasAuthenticated={userHasAuthenticated}
            />
          </Route>

          <Route exact path="/logout">
            { handleLogout }
          </Route>

          <Route exact path="/register">
            <RegisterModal setModal={setModal}
              userHasAuthenticated={userHasAuthenticated}
            />
          </Route>

          <Route exact path="/init">
            <InitInfo setModal={setModal} />
          </Route>

          <Route exact path="/password_reset">
            <PasswordResetModal/>
          </Route>
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
