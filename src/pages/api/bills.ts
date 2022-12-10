import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			const status = req.query.status;
			//console.log(status)
			if (typeof status == 'string') {
				const dbStatus = await prisma.bill_status.findFirst({ where: { status: status } })
				if (dbStatus) {

					const result = await prisma.bill.findMany({ where: { bill_status_idbill_status: dbStatus.idbill_status } })
					return res.json(result)
				}
				return res.json({ message: `no status ${status} found` })
			}
			const allBills = await prisma.bill.findMany({
				select: {
					idbills: true,
					date: true,
					due_date: true,
					bill_status: true,
					title: true,
					total: true,
					flat: true,
				}
			})
			const returnArr: any = []
			allBills.forEach(bill => {
				const obj = {
					idbills: bill.idbills,
					date: bill.date.toDateString(),
					due_date: bill.due_date.toDateString(),
					bill_status: bill.bill_status.status,
					title: bill.title,
					total: bill.total,
					flat: bill.flat.num,
				}
				returnArr.push(obj)
			})
			// console.log(allBills)
			return res.json(returnArr)
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