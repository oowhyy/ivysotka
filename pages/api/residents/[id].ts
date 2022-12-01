import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import dbConnect from "../../../server/lib/mongodb";
import Resident from "../../../server/models/Resident";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	const parsedID = parseInt(id?.toString() || 'NaN')
	if (isNaN(parsedID)) return res.status(400).json({ message: 'id must be a number' })
	switch (req.method) {
		case 'GET':
			{
				const resident = await prisma.resident.findUnique({ where: { id: parsedID } })
				return res.json(resident)
			}
		case 'DELETE':
			{
				const resident = await prisma.resident.delete({ where: { id: parsedID } })
				return res.status(203).json(resident)
			}
		default:
			return res.status(400).json({ message: 'error' })
	}
}
