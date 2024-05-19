import app from './src/app.js';

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
    console.log(`WSV coffee shop manager start with ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit Server Express`));
});
