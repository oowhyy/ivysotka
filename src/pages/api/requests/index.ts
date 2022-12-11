import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			const requests = await prisma.request.findMany({

				include: {
					resident: true,
					request_status: true
				}
			})
			// return res.json({ message: `no status ${status} found` })
			const formated = requests.map(request => {
				const obj = {
					id: request.idrequests,
					date: request.date.toDateString(),
					request_status: request.request_status.status,
					title: request.title,
					description: request.description,
					resident: request.resident.name,
				}
				return obj;
			})
			// console.log(allBills)
			return res.json(formated)
		// return res.json(users)
		// return await ResidentController.getAll(req, res);
		case 'POST':
			const { body: data } = req;
			const newRequest = await prisma.request.create({
				data
			})
			return res.status(201).json(newRequest)

		// return await ResidentController.create(req, res);



		default:
			res.status(400).json({ message: 'error' })
			break
	}

}