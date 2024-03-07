import express from 'express';
import cors from 'cors'
import authRoutes from '../src/routes/authentication.routes.js'
import userPageRoutes from '../src/routes/userPage.routes.js'
import personasPageRoutes from '../src/routes/personasPage.routes.js'
import productosPageRoutes from './routes/productosPage.routes.js'
import almacenPageRoutes from './routes/almacen.Page.routes.js'
import comprasPageRoutes from './routes/compras.Page.routes.js'
import useragent from 'express-useragent';
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json()) //entender JSON el backend
// Ejemplo de middleware express.static
app.use(express.static('public'));
app.use(useragent.express());
app.use(express.urlencoded({ extended: true }));

app.use('/api',authRoutes)
app.use('/api', userPageRoutes)
app.use('/api',personasPageRoutes)
app.use('/api', productosPageRoutes)
app.use('/api', almacenPageRoutes)
app.use('/api', comprasPageRoutes)
export default app;