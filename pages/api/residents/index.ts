import dbConnect from '../../../server/lib/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'
import ResidentController from '../../../server/controllers/residentController'
import { IResident } from '../../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


	await dbConnect()

	switch (req.method) {
		case 'GET':
			return await ResidentController.getAll(req, res);
		case 'POST':
			return await ResidentController.create(req, res);



		default:
			res.status(400).json({ message: 'error' })
			break
	}
}