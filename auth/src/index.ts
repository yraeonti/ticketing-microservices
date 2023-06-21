import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session'
import {signInRouter, currentUserRouter, signOutRouter, signUpRouter} from './routes'
import {errorHandler} from './middlewares'
import { connectDB } from './db';
import { NotFoundError } from './middlewares/NotFoundError';

const app = express()

app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.all('*', (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)


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
