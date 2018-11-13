import { startServer } from './startServer';

const port = 3000;

startServer(port).then(() => {
  console.log(`Listening at http://localhost:${port}/`);
});
