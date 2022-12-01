import axios from 'axios'
import { IResident } from '../../types/types'
export default class ResidentService {
	static async getAll() {
		try {
			const response = await axios.get('/api/residents')
			return response.data
		} catch (error) {
			if (error instanceof Error) {
				return error
			}
		}


	}
	static async deleteOne(id?: string) {
		if (!id) {
			return { message: 'no id provided' }
		}
		try {
			const response = await axios.delete(`/api/residents/${id}`)
			console.log(response)
			return response
		} catch (error) {
			console.log(error)
		}


	}

	static async create(newResident: IResident) {
		try {
			const response = await axios.post('/api/residents', {
				name: newResident.name,
				email: newResident.email,
			})
			console.log(response)
		} catch (error) {
			console.log(error)
		}

	}
}