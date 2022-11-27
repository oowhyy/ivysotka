import { NextApiRequest, NextApiResponse } from "next";
import ResidentController from "../../../server/controllers/residentController";
import Resident from "../../../server/models/Resident";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return await ResidentController.getOne(req, res);
		case 'DELETE':
			return await ResidentController.deleteOne(req, res);
		default:
			return res.status(400).json({ message: 'error' })
	}
}
