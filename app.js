import express from 'express';
import cors from 'cors';
import sequelize from './database/connection.js';
import routes from './routes/routes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { consumeOrderStarted } from './messages/consumeOrderStarted.js';
import { consumeOrderFailed } from './messages/consumeOrderFailed.js'

await sequelize.sync();
await consumeOrderStarted();
await consumeOrderFailed();

const app = express();
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(express.json());
app.use('/api/products', routes);
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log('Server is listening on port', PORT));
