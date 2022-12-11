import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			const status = req.query.status;
			//console.log(status)
			if (!status) {
				return res.json({ message: 'no status params' })
			}
			let statusArr: string[];
			if (typeof status === 'string') {
				statusArr = [status]
			} else {
				statusArr = [...status]
			}
			const statuses = await prisma.bill_status.findMany({
				where: { status: { in: statusArr } }
			})


			const selected = statuses.map((s) => s.idbill_status)
			const bills = await prisma.bill.findMany({
				where: {
					bill_status_idbill_status: { in: selected }
				},
				include: {
					bill_status: true,
					flat: true
				}
			})
			// return res.json({ message: `no status ${status} found` })



			const formated = bills.map(bill => {
				const obj = {
					idbills: bill.idbills,
					date: bill.date.toDateString(),
					due_date: bill.due_date.toDateString(),
					bill_status: bill.bill_status.status,
					title: bill.title,
					total: bill.total,
					flat: bill.flat.num,
				}
				return obj;
			})
			// console.log(allBills)
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