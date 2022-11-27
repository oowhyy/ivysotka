import mongoose from 'mongoose'

const ResidentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true }
})

const Resident = mongoose.models.Resident || mongoose.model('Resident', ResidentSchema)
export default Resident