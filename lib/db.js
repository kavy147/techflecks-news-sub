// lib/db.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/subscribeApp';

if (!global._mongooseConnection) {
  global._mongooseConnection = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default global._mongooseConnection;
