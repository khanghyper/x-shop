import initRoutes from './routes';
import './style.css'

const app = <HTMLDivElement>document.querySelector('#app');
// localStorage.removeItem('user')

initRoutes(app);

