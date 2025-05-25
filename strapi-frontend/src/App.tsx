import SideMenu from './components/SideMenu';
import { Container, CssBaseline } from '@mui/material';
import UsuariosList from './components/UsuariosList';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <SideMenu />
      </Container>
      <CssBaseline />
      <Container maxWidth="md">
        <UsuariosList />
      </Container>
    </>
    
  );
}

export default App;
