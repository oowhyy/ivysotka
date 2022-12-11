import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
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
	activeBills: Bill[]
	archiveBills: Bill[]
}


const bill_status = {
	1: 'оплачено',
	2: 'активно',
	3: 'просрочено'
}
export default function Bills({ activeBills, archiveBills }: BillsProps) {

	const router = useRouter();
	const [bills, setBills] = useState(activeBills)
	function handleRouting(param: string) {
		router.push({ pathname: '/bills', query: { status: param } }, undefined, { shallow: true })
		if (param == 'archive') {
			setBills(archiveBills)
		} else {
			setBills(activeBills)
		}
	}
	return (
		<Layout>
			<div>Задолженности</div>
			<Button onClick={() => { handleRouting('current') }} >Текущие</Button>
			<Button onClick={() => { handleRouting('archive') }} >Архив</Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>

							<TableCell align="left">Название</TableCell>
							<TableCell align="left">Дата создания</TableCell>
							<TableCell align="left">Дата оплаты</TableCell>
							<TableCell align="left">Квартира</TableCell>
							<TableCell align="left">Сумма</TableCell>

							<TableCell align="left"><b>Статус</b></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{bills.map((row) => (
							<TableRow
								key={row.idbills}
							// sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">{row.title}</TableCell>
								<TableCell align="left">{row.date}</TableCell>
								<TableCell align="left">{row.due_date}</TableCell>
								<TableCell align="left">{row.flat}</TableCell>
								<TableCell align="left">{row.total}</TableCell>
								<TableCell align="left"><b>{row.bill_status}</b></TableCell>
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
	const { data: activeBills } = await axios.get('http://localhost:3000/api/bills?status=активно&status=просрочено')
	const { data: archiveBills } = await axios.get('http://localhost:3000/api/bills?status=оплачено')
	// console.log(typeof archiveBills)


	// Pass data to the page via props
	return { props: { activeBills, archiveBills } }
}
