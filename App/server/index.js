require('dotenv').config();
const express = require('express');
const app = express();
// @ts-ignore
const profileRoute = require('./src/routes/profileRoutes')
app.use('/api/profile', profileRoute);
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});