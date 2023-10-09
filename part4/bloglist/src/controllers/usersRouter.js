import { Router } from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({}).populate('bloglist')
		res.json(users)
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

usersRouter.post('/', async (req, res, next) => {
	try {
		const { body } = req
		const newUser = body

		const saltRounds = 10
		newUser.password = await bcrypt.hash(newUser?.password, saltRounds)

		const response = await new User(newUser).save()
		res.json(response)
	} catch (e) {
		next(e)
	}
})

export default usersRouter
