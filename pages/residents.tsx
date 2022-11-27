
import { IResident } from "../types/types";


import { ChangeEvent, useEffect, useState } from "react";

import ResidentService from "../server/services/ResidentService";
import Layout from "../components/Layout";
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


export default function Residents() {
	const [residentList, setResidentList] = useState<IResident[]>([])
	const [fetchError, setFetchError] = useState<string | null>('Загрузка')
	const [open, setOpen] = useState(false);
	const [residentFormData, setResidentFormData] = useState({ name: '', email: '' })
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
		const newResident = { _id: 'auto', name: `Test ${residentFormData.name}`, email: `test${residentFormData.email}@mail.test` }
		setResidentFormData({ name: '', email: '' })
		ResidentService.create(newResident);
		fetchResidents();
	}
	const handleDeleteResident = async (id: string) => {
		// console.log(id)
		ResidentService.deleteOne(id)
		fetchResidents();
	}

	function handleFormNameChange(e: ChangeEvent<HTMLInputElement>) {
		setResidentFormData({ ...residentFormData, name: e.target.value })
	}
	function handleFormEmailChange(e: ChangeEvent<HTMLInputElement>) {
		setResidentFormData({ ...residentFormData, email: e.target.value })
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
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Форма добавления жильца</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Подзаголовок
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Имя"
						type="text"
						fullWidth
						variant="standard"
						placeholder="Петя"
						value={residentFormData.name}
						onChange={handleFormNameChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="email"
						type="text"
						fullWidth
						variant="standard"
						placeholder="petya@mymail.com"
						value={residentFormData.email}
						onChange={handleFormEmailChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Закрыть</Button>
					<Button onClick={handleSubmitForm}>Записать</Button>
				</DialogActions>
			</Dialog>
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
										key={row._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">{row._id}</TableCell>

										<TableCell align="right">{row.name}</TableCell>
										<TableCell align="right">{row.email}</TableCell>
										<TableCell align="right">
											<Button
												disableElevation
												variant="contained"
												onClick={() => handleDeleteResident(row._id)}
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