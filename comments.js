//Create web server
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const fs = require('fs');
const path = require('path');

//Create a comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ error: 'There was an error reading the file' });
            return;
        }
        const comments = JSON.parse(data);
        comments.push(newComment);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                console.error(err);
                res.json({ error: 'There was an error writing the file' });
                return;
            }
            res.json({ message: 'Comment added' });
        });
    });
});

//Read all comments