import express from 'express'
import graphqlHTTP from 'express-graphql'

import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'

import _schema from './models'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())

const PORT = 3000

const SECRET = 'eutvh435874vj577yvy37b87'

export const server = async () => {
    try {
		
		app
		.use('/graphql', graphqlHTTP(async (request) => ({
		  schema: _schema,
		  context: await token(request),
		  graphiql: true
		})))
	
		graphql(_schema, introspectionQuery)
			.then(result => {
		fs.writeFileSync(
			path.join(__dirname, 'cache/schema.json'),
			JSON.stringify(result, null, 2)
		)
			console.log('Generated cached schema.json file')
		})
		.catch(console.error)
		
		app.listen(3000)
		
		async function token (request) {
			const token = request.headers['x-token']
			if (token) {
				try {
					const session = await jwt.verify(token, SECRET)
					return {
						session
					}
				} catch (e) {
				   return {}
				}
			}
			return {}
		}
    } catch (e) {
        console.log(e)
    }
}