

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../db/client';

// import prisma from "../../../db/client";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			const residents = await prisma.resident.findMany({ include: { flat: true } })
			const formated = residents.map((resident) => {
				const obj = {
					id: resident.idresidents,
					name: resident.name,
					email: resident.email,
					phone_num: resident.phone_num,
					flat_num: resident.flat.num
				}
				return obj;
			})
			return res.json(formated)
		// return res.json(users)
		// return await ResidentController.getAll(req, res);
		case 'POST':
			const { body: data } = req;
			const newUser = await prisma.resident.create({
				data
			})
			return res.status(201).json(newUser)

		// return await ResidentController.create(req, res);



		default:
			res.status(400).json({ message: 'error' })
			break
	}

}