import 'dotenv/config';import app from './app.js';import {connectDB} from './config/db.js';
const port=process.env.PORT||5000;let server;
async function start(){await connectDB();server=app.listen(port,()=>console.log(`API listening on ${port}`));}
async function shutdown(signal){console.log(`${signal}: shutting down`);if(server)server.close(()=>process.exit(0));else process.exit(0);}
process.on('SIGTERM',()=>shutdown('SIGTERM'));process.on('SIGINT',()=>shutdown('SIGINT'));
start().catch(err=>{console.error('Startup failed',err);process.exit(1);});
