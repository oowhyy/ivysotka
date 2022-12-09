import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			const status = req.query.status;
			console.log(status)
			if (typeof status == 'string') {
				const result = await prisma.bill_status.findFirst({ where: { status: status } })
				if (result) {

					return res.json(result)
				}
				return res.json({ message: `no status ${status} found` })
			}
			return res.json({ message: 'ok' })
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