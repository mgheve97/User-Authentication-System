import express, { json } from 'express';
import { createConnection } from 'mysql';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'


const secretKey = crypto.randomBytes(32).toString('hex');
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(json());

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'useraccount'
});

db.connect((err) =>{
    if(err){
        console.error('Database connection failed: ' + err.stack);
        return
    }
    console.log('Connected to  MySQL database');
})

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM users'
    db.query(query, (err, result) =>{
        if(err){
            return res.status(500).send(err);
        }
        res.json(result)
    })
})

const saltRounds = 10;

app.post('/api/register', (req, res) => {
  const { email, password, confirmpass, createdAt, admin } = req.body;
  const emailquery = 'SELECT * FROM users WHERE email = ?';

  // Check if user already exists
  db.query(emailquery, [email], (err, result) =>{
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Check if the passwords match
    if (password !== confirmpass) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password before saving to the database
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }

        // Save the hashed password in the database (not the plain text password)
        const query = 'INSERT INTO users (email, password, admin,created_at ) VALUES (?, ?, ?, ?)';
        const values = [email, hashedPassword, admin, createdAt ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting data into database: ', err);
                return res.status(500).json({ error: 'Error saving user data' });
            }

            res.status(201).json({ message: 'User registered successfully', result });
        });
    });
  })
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database query error' });
      }
  
      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const user = result[0];
  
      // Compare the entered password with the hashed password stored in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        
        if (err) {
          return res.status(500).json({ message: 'Error comparing passwords' });
        }
  
        if (isMatch) {
          // Generate JWT token
          const token = jwt.sign({ email: user.email, id: user.id }, secretKey, { expiresIn: '1h' });
          return res.status(200).json({ message: 'Login successful', token });
        } else {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      });
    });
  });


app.listen(5000, () =>{
    console.log('Server is running on port 5000')
})
