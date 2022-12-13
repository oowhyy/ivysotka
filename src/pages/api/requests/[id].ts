import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import prisma from "../../../db/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	const parsedID = parseInt(id?.toString() || 'NaN')
	if (isNaN(parsedID)) return res.status(400).json({ message: 'id must be a number' })
	switch (req.method) {
		case 'GET':
			{
				const request = await prisma.request.findUnique({ where: { idrequests: parsedID }, include: { resident: true } })
				if (!request) return res.json({ message: 'not found' })
				const formated = {
					id: request.idrequests,
					date: request.date.toLocaleDateString(),
					title: request.title,
					description: request.description,
					resident: request.resident.name
				}
				return res.json(formated)


			}
		case 'DELETE':
			{
				const request = await prisma.request.delete({ where: { idrequests: parsedID } })
				return res.status(203).json(request)
			}
		default:
			return res.status(400).json({ message: 'error' })
	}
}
