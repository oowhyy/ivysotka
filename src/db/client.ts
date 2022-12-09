import { PrismaClient } from "@prisma/client";

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var globalProsma: PrismaClient | undefined;
}

const prisma =
	global.globalProsma ||
	new PrismaClient({
		log: ["query"],
	});

if (process.env.NODE_ENV !== "production") {
	console.log('not production')

	global.globalProsma = prisma;
}
export default prisma;