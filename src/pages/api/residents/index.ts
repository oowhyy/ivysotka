

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

// import prisma from "../../../db/client";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const prisma = new PrismaClient();
	switch (req.method) {
		case 'GET':
			const residents = await prisma.resident.findMany()
			return res.json(residents)
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