require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connectDB');

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

connectDB(process.env.MONGODB_URI);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
