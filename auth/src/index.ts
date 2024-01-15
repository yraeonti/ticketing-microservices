import { connectDB } from './db';
import {app} from './app'


const PORT = 3000;

 (async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('env variable not found');
  }

   try {
    await connectDB()

    console.log('connected to mongodb...');
   } catch (error) {
    console.log(error);
   }

   app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
})
 })()
