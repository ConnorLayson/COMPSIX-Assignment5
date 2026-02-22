const express = require('express');
const app = express();
const menuRoutes = require('./routes/menu');
const logger = require('./middleware/logger');

app.use(express.json());

// Custom Logging Middleware
app.use(logger);

// Routes
app.use('/api/menu', menuRoutes);

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
