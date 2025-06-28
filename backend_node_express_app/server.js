const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// File-based storage location
const DATA_FILE = path.join(__dirname, 'learning_goals.json');

// In-memory cache for quick access (reloaded on server start and after each update)
let learningGoals = [];

// PUBLIC_INTERFACE
/**
 * Loads the data from the file into memory.
 */
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      learningGoals = JSON.parse(raw);
    } catch (err) {
      learningGoals = [];
    }
  } else {
    learningGoals = [];
  }
}

// PUBLIC_INTERFACE
/**
 * Saves the in-memory data to the file.
 */
function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(learningGoals, null, 2));
}

// Initialize data on server start
loadData();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

/**
 * @swagger
 * LearningGoal Schema
 * {
 *   id: string (uuid),
 *   topicName: string,
 *   status: string,
 *   targetDate: string (ISO date),
 *   notes: string,
 *   category: string (optional)
 * }
 */

/**
 * Generates a simple unique ID.
 */
function uuid() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// PUBLIC_INTERFACE
/**
 * Create a new learning goal
 * POST /api/goals
 * Body: { topicName, status, targetDate, notes, category (optional) }
 */
app.post('/api/goals', (req, res) => {
  const { topicName, status, targetDate, notes, category } = req.body;
  if (!topicName || !status || !targetDate) {
    return res.status(400).json({ error: 'topicName, status, and targetDate are required' });
  }
  const newGoal = {
    id: uuid(),
    topicName,
    status,
    targetDate,
    notes: notes || '',
    category: category || ''
  };
  learningGoals.push(newGoal);
  saveData();
  res.status(201).json(newGoal);
});

// PUBLIC_INTERFACE
/**
 * Get all learning goals, with optional filtering by status or category
 * GET /api/goals?status={status}&category={category}
 */
app.get('/api/goals', (req, res) => {
  let result = [...learningGoals];
  const { status, category } = req.query;
  if (status) {
    result = result.filter(goal => goal.status.toLowerCase() === status.toLowerCase());
  }
  if (category) {
    result = result.filter(goal => (goal.category || '').toLowerCase() === category.toLowerCase());
  }
  res.json(result);
});

// PUBLIC_INTERFACE
/**
 * Get a specific learning goal by ID
 * GET /api/goals/:id
 */
app.get('/api/goals/:id', (req, res) => {
  const { id } = req.params;
  const goal = learningGoals.find(goal => goal.id === id);
  if (!goal) {
    return res.status(404).json({ error: 'Goal not found' });
  }
  res.json(goal);
});

// PUBLIC_INTERFACE
/**
 * Update a learning goal by ID
 * PUT /api/goals/:id
 * Body: { topicName, status, targetDate, notes, category (optional) }
 */
app.put('/api/goals/:id', (req, res) => {
  const { id } = req.params;
  const idx = learningGoals.findIndex(goal => goal.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Goal not found' });
  }
  const { topicName, status, targetDate, notes, category } = req.body;
  // Do not allow updating id
  learningGoals[idx] = {
    ...learningGoals[idx],
    topicName: topicName ?? learningGoals[idx].topicName,
    status: status ?? learningGoals[idx].status,
    targetDate: targetDate ?? learningGoals[idx].targetDate,
    notes: notes ?? learningGoals[idx].notes,
    category: category ?? learningGoals[idx].category
  };
  saveData();
  res.json(learningGoals[idx]);
});

// PUBLIC_INTERFACE
/**
 * Delete a learning goal by ID
 * DELETE /api/goals/:id
 */
app.delete('/api/goals/:id', (req, res) => {
  const { id } = req.params;
  const idx = learningGoals.findIndex(goal => goal.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Goal not found' });
  }
  const deleted = learningGoals.splice(idx, 1);
  saveData();
  res.json({ deleted: deleted[0] });
});

// PUBLIC_INTERFACE
/**
 * Get progress summary
 * GET /api/summary
 * Returns:
 * {
 *   total: number,
 *   completed: number,
 *   inProgress: number,
 *   notStarted: number,
 *   percentComplete: number (0-100)
 * }
 */
app.get('/api/summary', (req, res) => {
  const total = learningGoals.length;
  let completed = 0, inProgress = 0, notStarted = 0;
  for (const g of learningGoals) {
    if (g.status.toLowerCase() === 'completed') completed++;
    else if (g.status.toLowerCase() === 'in progress') inProgress++;
    else notStarted++;
  }
  res.json({
    total,
    completed,
    inProgress,
    notStarted,
    percentComplete: total ? Math.round((completed / total) * 100) : 0
  });
});

// Root API info
app.get('/', (req, res) => {
  res.json({ message: 'Personal Learning Tracker Backend - Node.js/Express' });
});

app.listen(PORT, () => {
  console.log(`Learning Tracker backend server running at http://localhost:${PORT}`);
});
