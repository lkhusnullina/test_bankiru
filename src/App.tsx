import { Container } from '@mui/material';
import './index.css';
import { AppRoutes } from './routes';

function App() {

  return (
    <Container maxWidth="sm" sx={{mt: '1rem'}}>
      <AppRoutes />
    </Container>
  );
}

export default App;
