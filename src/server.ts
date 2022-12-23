import express from 'express';
import { images, routes } from './routes/api/images';

const app = express();
const port = 8000;
// Run  Apis from routes Folder
app.use('/api', routes);
//use The images Apis
routes.use('/images', images);
//default Port
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).redirect('/api');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;
