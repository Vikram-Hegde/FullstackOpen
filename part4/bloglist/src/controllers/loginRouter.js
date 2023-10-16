import { Router } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body

	const user = await User.findOne({ username })
	const passwordCheck =
		user === null ? false : await bcrypt.compare(password, user.password)

	if (!(user && passwordCheck))
		return res.status(401).json({ error: 'invalid username or password' })

	const userToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 })

	res.json({ token, username: user.username, name: user.name })
})

export default loginRouter
