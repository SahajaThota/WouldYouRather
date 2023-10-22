const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Read questions from JSON file
let questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

app.get('/question', (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    res.json(questions[randomIndex]);
});

app.post('/answer', (req, res) => {
    const questionId = req.body.questionId;
    const selectedOption = req.body.answer;

    // Find the question by ID and update the percentages (simplified)
    const question = questions.find(q => q.id === questionId);
    if (question) {
        if (selectedOption === 'option1') {
            question.option1.percentage += 1;
        } else {
            question.option2.percentage += 1;
        }

        // Save updated questions back to JSON file
        fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
    }

    res.status(200).send('Answer received and percentages updated');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
