import mongoose from 'mongoose'

declare global {
	var isConnected: mongoose.ConnectionStates
}
