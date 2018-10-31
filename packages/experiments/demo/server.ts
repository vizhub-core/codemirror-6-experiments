import * as express  from 'express';
import {
  Application,
  Router,
  Request,
  Response
} from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


const app: Application = express();
const port: number = 3000;
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
