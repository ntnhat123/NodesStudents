import express, { json } from 'express'
import * as dotenv from 'dotenv'
import { userRouter,studentRouter } from './routes/index.js'
import checkToken from './authentication/auth.js'
dotenv.config()
import connect from './database/database.js'
const app = express()
const port = process.env.PORT ?? 3000
app.use(express.json())
app.use(checkToken)
app.use('/user',userRouter)
app.use('/students',studentRouter)
app.get('/',(req,res)=>{
    res.send('Hello nhật nhật')
})

app.listen(port,async()=>{
    await connect()
    console.log(`lissten on port: ${port}`)
})