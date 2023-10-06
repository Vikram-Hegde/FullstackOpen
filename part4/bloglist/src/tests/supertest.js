import supertest from 'supertest'
import { app } from '../index.js'

export const api = supertest(app)
