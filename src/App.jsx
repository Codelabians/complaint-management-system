import { Toaster } from 'react-hot-toast';
import './index.css'
import AppRouter from './routes/Routes';



function App() {
  return (
    <>
       <Toaster position='top-center'/>
       <AppRouter/>
    </>
  );
}

export default App;




