const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./movies.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create movies table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            genre TEXT,
            cast TEXT,
            poster TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Movies table created or already exists.');
                // Optional: Insert some dummy data if the table is empty
                db.get(`SELECT COUNT(*) AS count FROM movies`, (err, row) => {
                    if (err) {
                        console.error('Error checking movie count:', err.message);
                        return;
                    }
                    if (row.count === 0) {
                        const stmt = db.prepare(`INSERT INTO movies (title, description, genre, cast, poster) VALUES (?, ?, ?, ?, ?)`);
                        stmt.run('Fast & Furious', 'A series of action films centered on illegal street racing, heists, and espionage.', 'Action, Crime, Thriller', 'Vin Diesel, Paul Walker, Michelle Rodriguez', 'image/fast_furious.jpg');
                        stmt.run('Fast Five', 'Dominic Toretto and his crew plan a massive heist to steal $100 million from a corrupt businessman.', 'Action, Crime, Thriller', 'Vin Diesel, Paul Walker, Dwayne Johnson', 'image/fast_five.jpg');
                        stmt.run('The Lord of the Rings: The Fellowship of the Ring', 'A young hobbit, Frodo Baggins, inherits a magical ring that is the key to the Dark Lord Sauron\'s plan to conquer Middle-earth.', 'Fantasy, Adventure', 'Elijah Wood, Ian McKellen, Viggo Mortensen', 'image/lotr_fellowship.jpg');
                        stmt.run('The Lord of the Rings: The Two Towers', 'Frodo and Sam continue their journey to destroy the One Ring, while Aragorn, Legolas, and Gimli join forces to fight against Sauron\'s forces.', 'Fantasy, Adventure', 'Elijah Wood, Ian McKellen, Viggo Mortensen', 'image/lotr_two_towers.jpg');
                        stmt.finalize();
                        console.log('Dummy movie data inserted.');
                    }
                });
            }
        });
    }
});

// Test API endpoint
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Search API endpoint
app.get('/api/movies/search', (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }
    const searchTerm = `%${query}%`;
    db.all(`SELECT * FROM movies WHERE title LIKE ?`, [searchTerm], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Movie Details API endpoint
app.get('/api/movies/:id', (req, res) => {
    const movieId = req.params.id;
    db.get(`SELECT * FROM movies WHERE id = ?`, [movieId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(row);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
