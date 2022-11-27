
import type { NextApiRequest, NextApiResponse } from 'next'
import { IResident } from '../../types/types'
import Resident from '../models/Resident'


class ResidentController {
	static async getAll(req: NextApiRequest, res: NextApiResponse) {
		try {
			// console.log('GOT GET REQUEST')
			const users = await Resident.find({})
			return res.status(200).json(users)
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json(error.message)
			}
		}
	}
	static async getOne(req: NextApiRequest, res: NextApiResponse) {
		const { residentId } = req.query
		try {
			const result = await Resident.findById(residentId).exec()
			return res.status(200).json(result)

		} catch (error) {
			if (error instanceof Error) {
				if (error.name == "CastError") {
					return res.json({ message: `resident with id ${residentId} not found` })
				} else {
					return res.status(500)
				}

			} else {
				return res.status(500)
			}
		}
	}
	static async create(req: NextApiRequest, res: NextApiResponse) {
		try {
			// console.log('GOT POST REQUEST')
			const user = await Resident.create(req.body)
			return res.status(201).json(user)
		} catch (error) {
			return res.status(400).json({ message: 'error' })
		}
	}
	static async deleteOne(req: NextApiRequest, res: NextApiResponse) {
		const { residentId } = req.query
		try {
			// console.log('GOT DELETE REQUEST')
			const user = await Resident.deleteOne({ _id: residentId })
			return res.status(203).json(user)
			// return { status: 203, data: user }
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json(error.message)
			}
		}
	}
}
export default ResidentController