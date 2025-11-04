const { v4: uuidv4 } = require("uuid");
const createDbConnection = require("../db");

require("dotenv").config();

const addArticle = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const { title, content, user_id, category, tags, preview, annotation, author, readTime } = req.body;

    console.log(title, content, user_id, category, tags);
    

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    const [result] = await connection.execute(
      `INSERT INTO articles 
      (id, title, content, user_id, category, tags, createdAt, preview, annotation, author, readTime) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, content, user_id, category, tags || null, createdAt, preview, annotation, author, readTime]
    );

    res.status(201).json({
      id,
      message: "Article created successfully",
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.end();
  }
};

const getArticles = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const [rows] = await connection.execute(`
      SELECT * 
      FROM articles 
      ORDER BY createdAt DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getArticlesByUser = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { user_id } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM articles WHERE user_id = ? 
       ORDER BY createdAt DESC`,
      [user_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching articles by user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getArticlesByCategory = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { category } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM articles WHERE category = ?`,
      [category]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getArticlesByID = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM articles WHERE id = ? 
       ORDER BY createdAt DESC`,
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const getSingleArticle = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM articles WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const editArticle = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;
    const { title, content, category, tags, readTime, annotation, preview, author } = req.body;


    const [result] = await connection.execute(
      `UPDATE articles 
      SET title = ?, content = ?, category = ?, tags = ?, readTime = ?, annotation = ?, preview = ?, author = ?
      WHERE id = ?`,
      [title, content, category, tags || null, readTime, annotation, preview, author, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article updated successfully" });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const deleteArticle = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [result] = await connection.execute(
      `DELETE FROM articles WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const likeArticle = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [result] = await connection.execute(
      `UPDATE articles 
      SET likes = likes + 1 
      WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article liked successfully" });
  } catch (error) {
    console.error("Error liking article:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const unlikeArticle = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [result] = await connection.execute(
      `UPDATE articles 
      SET likes = GREATEST(likes - 1, 0) 
      WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article unliked successfully" });
  } catch (error) {
    console.error("Error unliking article:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

const searchArticles = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { query } = req.query;

    const [rows] = await connection.execute(
      `SELECT * FROM articles 
       WHERE title LIKE ? OR content LIKE ? OR tags LIKE ?
       ORDER BY createdAt DESC`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error searching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  addArticle,
  getArticles,
  getArticlesByUser,
  getArticlesByCategory,
  getSingleArticle,
  editArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
  searchArticles,
  getArticlesByID
};