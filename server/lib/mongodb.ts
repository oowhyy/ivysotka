import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/


const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	)
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const connection = { isConnected: global.isConnected } /* creating connection object*/

async function dbConnect() {
	/* check if we have connection to our databse*/
	if (connection.isConnected == mongoose.ConnectionStates.connected) {
		return 'already connected'
	}

	/* connecting to our database */
	const db = await mongoose.connect(MONGODB_URI!, {})

	global.isConnected = db.connections[0].readyState
	mongoose.connection.once('open', () => console.log('CONNECTED ONCE'))
	return 'connected to database'
}

export default dbConnect