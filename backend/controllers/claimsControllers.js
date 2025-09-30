const { v4: uuidv4 } = require("uuid");
const createDbConnection = require("../db");

const addClaim = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { name, phone, content } = req.body;

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    await connection.execute(
      `INSERT INTO claims (id, createdAt, name, phone, content) VALUES (?, ?, ?, ?, ?)`,
      [id, createdAt, name, phone, content || null]
    );

    res.status(201).json({ id, message: "Заявка создана" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания заявки" });
  } finally {
    if (connection) await connection.end();
  }
};

const getClaims = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();

    const [rows] = await connection.execute(`
      SELECT * FROM claims 
      ORDER BY createdAt DESC 
      LIMIT 100
    `);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения заявок" });
  } finally {
    if (connection) await connection.end();
  }
};

const updateClaim = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;
    const { status } = req.body;

    const [result] = await connection.execute(
      `UPDATE claims SET status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.status(200).json({ message: "Заявка обновлена" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления заявки" });
  } finally {
    if (connection) await connection.end();
  }
};

const deleteClaim = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [result] = await connection.execute(
      `DELETE FROM claims WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.status(200).json({ message: "Заявка удалена" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления заявки" });
  } finally {
    if (connection) await connection.end();
  }
};

const getClaimById = async (req, res) => {
  let connection;
  try {
    connection = await createDbConnection();
    const { id } = req.params;

    const [rows] = await connection.execute(
      `SELECT * FROM claims WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения заявки" });
  } finally {
    if (connection) await connection.end();
  }
};


module.exports = {
  addClaim,
  getClaims,
  getClaimById,
  updateClaim,
  deleteClaim
};