import dotenv from 'dotenv';
import connectDb from './config/db/dbConnect.js';
import { app } from './app.js'
import('./config/third_party_strategies/googleStrategyAuth.js');
dotenv.config();


const PORT = process.env.PORT || 3000;
const startApp = async () => {
    await connectDb();
    
    await app.listen(PORT, () => {
        
        console.log(`Server is listening on port ${PORT}`);
    })
}
startApp();