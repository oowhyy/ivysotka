



import { ChangeEvent, useEffect, useMemo, useState } from "react";

import ResidentService from "../../server/services/ResidentService";
import { DataGrid } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Link from "next/link";
import Layout from "../../components/Layout";
import NewResidentModal from "../../components/NewResidentModal";
import { IResident } from "../../types";


export default function Residents() {
	const [residentList, setResidentList] = useState<IResident[]>([])
	const [fetchError, setFetchError] = useState<string | null>('Загрузка')
	const [open, setOpen] = useState(false);
	const [residentFormData, setResidentFormData] = useState({ name: '', email: '', phone_num: '', flat_num: '' })
	const columns = useMemo(() => [
		{ field: 'name', headerName: 'ФИО', flex: 2 },
		{ field: 'email', headerName: 'Email', flex: 2 },
		{ field: 'phone_num', headerName: 'Телефон', flex: 1 },
		{ field: 'flat_num', headerName: 'Номер квартиры', flex: 1 },
	], [])

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
		const newResident: IResident = { id: 'auto', ...residentFormData }
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

			<div style={{ height: '500px' }} >
				<DataGrid
					rows={residentList}
					getRowId={(row) => row.id}
					rowHeight={60}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
				/>
			</div>

		</Layout >


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