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
	static async deleteOne(id: string) {
		const response = await axios.delete(`/api/residents/${id}`)
			// .then(resp => console.log(resp.data))
			.catch(err => console.log(err))
	}
	static async create(newResident: IResident) {
		try {
			axios.post('/api/residents', {
				name: newResident.name,
				email: newResident.email,
			})
		} catch (error) {

		}

	}
}