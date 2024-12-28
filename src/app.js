require('dotenv').config({path: '../.env'}); 
const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
const estadosRoutes = require('./routes/estados');
const rolesRoutes = require('./routes/roles');
const usuariosRoutes = require('./routes/usuarios');
const categoriaProductosRoutes = require('./routes/categoriaProductos');
const clientesRoutes = require('./routes/clientes');
const productosRoutes = require('./routes/productos');
const ordenesRoutes = require('./routes/orden');
const loginRoutes = require('./routes/login');

const port = 5000;
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use(bodyParser.json());


app.use('/estados', estadosRoutes);
app.use('/roles', rolesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/categoriaproductos', categoriaProductosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/productos', productosRoutes);
app.use('/ordenes', ordenesRoutes);
app.use('/login', loginRoutes);


app.get('/', (req, res) => {
    res.send(`Server running`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});