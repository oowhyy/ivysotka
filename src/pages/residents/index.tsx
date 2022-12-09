
import { IResident } from "../../types/types";


import { ChangeEvent, useEffect, useState } from "react";

import ResidentService from "../../server/services/ResidentService";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from "next/link";
import Layout from "../../components/Layout";
import NewResidentModal from "../../components/NewResidentModal";


export default function Residents() {
	const [residentList, setResidentList] = useState<IResident[]>([])
	const [fetchError, setFetchError] = useState<string | null>('Загрузка')
	const [open, setOpen] = useState(false);
	const [residentFormData, setResidentFormData] = useState({ name: '', email: '', phone_num: '', flat_num: '' })
	useEffect(() => {
		fetchResidents();
	}, [])
	async function fetchResidents() {
		const res = await ResidentService.getAll()
		if (res instanceof Error) {
			setFetchError(res.message)
			return
		}
		setFetchError(null)
		// console.log(res)
		setResidentList(res)
	}

	const handleSubmitForm = async () => {
		setOpen(false);
		const newResident = { idresidents: 'auto', ...residentFormData }
		setResidentFormData({ name: '', email: '', phone_num: '', flat_num: '' })
		await ResidentService.create(newResident);
		fetchResidents();
	}
	const handleDeleteResident = async (id?: string) => {
		// console.log(id)
		const res = await ResidentService.deleteOne(id)
		fetchResidents();
	}

	function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
		setResidentFormData({ ...residentFormData, [e.target.id]: e.target.value })
	}


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Layout >
			<Button variant="outlined" onClick={handleClickOpen}>
				Добавить жильца
			</Button>
			<NewResidentModal
				formData={residentFormData}
				handleClose={handleClose}
				handleSubmitForm={handleSubmitForm}
				handleFormChange={handleFormChange}
				open={open}
			/>
			<h1>Список жильцов</h1>
			{
				residentList.length ?
					(<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>id</TableCell>
									<TableCell align="right">name</TableCell>
									<TableCell align="right">email</TableCell>
									<TableCell align="right">options</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{residentList.map((row) => (
									<TableRow
										key={row.idresidents}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">{row.idresidents}</TableCell>

										<TableCell align="right"><Link href={`/residents/${row.idresidents}`}>{row.name}</Link></TableCell>
										<TableCell align="right">{row.email}</TableCell>
										<TableCell align="right">
											<Button
												disableElevation
												variant="contained"
												onClick={() => handleDeleteResident(row.idresidents)}
											>
												Удалить
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>)
					: 'Загрузка...'}

		</Layout>


	)
}



// export async function getServerSideProps() {


// 	await dbConnect();


// 	const residents = await Resident.find();
// 	console.log('RUN SERVERSIDE PROPS')
// 	return {
// 		props: { residents: JSON.parse(JSON.stringify(residents)) }
// 	}


// }