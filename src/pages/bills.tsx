import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
interface Bill {
	idbills: number,
	date: string,
	due_date: string,
	title: string,
	total: number,
	flat: string,
	bill_status: string,
}
interface BillsProps {
	allBills: Bill[]
	archiveBills: Bill[]
}


const bill_status = {
	1: 'оплачено',
	2: 'активно',
	3: 'просрочено'
}
export default function Bills({ allBills, archiveBills }: BillsProps) {
	const router = useRouter();
	function handleRouting(param: string) {
		router.push({ pathname: '/bills', query: { status: param } }, undefined, { shallow: true })
	}
	return (
		<Layout>
			<div>Задолженности</div>
			<button onClick={() => { handleRouting('all') }} >active</button>
			<button onClick={() => { handleRouting('archive') }} >active</button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>

							<TableCell align="right">Название</TableCell>
							<TableCell align="right">Дата создания</TableCell>
							<TableCell align="right">Дата оплаты</TableCell>
							<TableCell align="right">Квартира</TableCell>
							<TableCell>Статус</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{allBills.map((row) => (
							<TableRow
								key={row.idbills}
							// sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">{row.title}</TableCell>
								<TableCell align="right">{row.date}</TableCell>
								<TableCell align="right">{row.due_date}</TableCell>
								<TableCell align="right">{row.flat}</TableCell>
								<TableCell align="right">{row.bill_status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Layout>
	)
}

export async function getServerSideProps() {
	// Fetch data from external API
	const allBills = await axios.get('http://localhost:3000/api/bills')
	const { data: archiveBills } = await axios.get('http://localhost:3000/api/bills?status=оплачено')
	console.log(allBills.data)
	// console.log(typeof archiveBills)


	// Pass data to the page via props
	return { props: { allBills: allBills.data } }
}
