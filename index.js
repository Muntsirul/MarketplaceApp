const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);

// Connect to MongoDB
const uri = "mongodb+srv://haquemuntasirul1:800900123@marketplacecluster.vfbb3.mongodb.net/?retryWrites=true&w=majority&appName=MarketplaceCluster";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('{"message":"Welcome to DressStore application."}');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
