module.exports = (pool) => {
	const router = require("express").Router()

	// CREATE table se não existir
	pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `)

	// CRUD básico
	router.get("/", async (req, res) => {
		const { rows } = await pool.query("SELECT * FROM users;")
		res.json(rows)
	})

	router.post("/", async (req, res) => {
		const { name } = req.body
		const { rows } = await pool.query("INSERT INTO users(name) VALUES($1) RETURNING *;", [name])
		res.status(201).json(rows[0])
	})

	router.put("/:id", async (req, res) => {
		const { id } = req.params
		const { name } = req.body
		const { rows } = await pool.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING *;", [name, id])
		res.json(rows[0])
	})

	router.delete("/:id", async (req, res) => {
		await pool.query("DELETE FROM users WHERE id=$1;", [req.params.id])
		res.status(204).send()
	})

	return router
}
