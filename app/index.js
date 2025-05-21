const express = require("express")
const { Pool } = require("pg")
const usersRouter = require("./routes/users")

const app = express()
app.use(express.json())

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
})

app.get("/", (req, res) => res.send("DimDim App OK"))
app.use("/users", usersRouter(pool))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App rodando na porta ${port}`))
