const { v4: uuidv4 } = require("uuid");
const createDbConnection = require("../db");

require("dotenv").config();

const addQuestion = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const { content, author } = req.body;

    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const isFeatured = 0;
    const answer = null;

    const [result] = await connection.execute(
      `INSERT INTO questions 
      (id, createdAt, content, answer, isFeatured, author) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [id, createdAt, content, answer, isFeatured, author || null]
    );

    res.status(201).json({
      id,
      message: "Question created successfully",
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.end();
  }
};

const getQuestions = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const [rows] = await connection.execute(`
      SELECT * 
      FROM questions 
      ORDER BY createdAt DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getFeaturedQuestions = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const [rows] = await connection.execute(`
      SELECT * 
      FROM questions 
      WHERE isFeatured = 1
      ORDER BY createdAt DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching featured questions:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getUnansweredQuestions = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const [rows] = await connection.execute(`
      SELECT * 
      FROM questions 
      WHERE answer IS NULL OR answer = ''
      ORDER BY createdAt DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching unanswered questions:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getAnsweredQuestions = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const [rows] = await connection.execute(`
      SELECT * 
      FROM questions 
      WHERE answer IS NOT NULL 
        AND answer != ''
        AND isFeatured = 1
      ORDER BY createdAt DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching answered questions:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getQuestionsByAuthor = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { author } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM questions WHERE author = ? 
       ORDER BY createdAt DESC`,
      [author]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching questions by author:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getSingleQuestion = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM questions WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const answerQuestion = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;
    const { answer } = req.body;

    const [result] = await connection.execute(
      `UPDATE questions 
      SET answer = ?
      WHERE id = ?`,
      [answer, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question answered successfully" });
  } catch (error) {
    console.error("Error answering question:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const toggleFeatured = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;
    const { isFeatured } = req.body;

    const [result] = await connection.execute(
      `UPDATE questions 
      SET isFeatured = ?
      WHERE id = ?`,
      [isFeatured ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ 
      message: `Question ${isFeatured ? 'featured' : 'unfeatured'} successfully`,
      isFeatured: isFeatured ? 1 : 0
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const editQuestion = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;
    const { content, author } = req.body;

    const [result] = await connection.execute(
      `UPDATE questions 
      SET content = ?, author = ?
      WHERE id = ?`,
      [content, author || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const deleteQuestion = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [result] = await connection.execute(
      `DELETE FROM questions WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const searchQuestions = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { query } = req.query;

    const [rows] = await connection.execute(
      `SELECT * FROM questions 
       WHERE content LIKE ? OR answer LIKE ? OR author LIKE ?
       ORDER BY createdAt DESC`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error searching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  getFeaturedQuestions,
  getUnansweredQuestions,
  getAnsweredQuestions,
  getQuestionsByAuthor,
  getSingleQuestion,
  answerQuestion,
  toggleFeatured,
  editQuestion,
  deleteQuestion,
  searchQuestions
};