import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import axios from "axios";
import { GetServerSideProps } from "next";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import NewRequestDialog from "../components/NewRequestDialog";
import RequestDialog from "../components/RequestDialog";
import { IResident } from "../types";

interface requestProps {
	residentNames: { name: string, id: number }[]
}
const columns = [
	{ field: 'resident', headerName: 'Жилец', flex: 2 },
	{ field: 'date', headerName: 'Дата', flex: 2 },
	{ field: 'title', headerName: 'Заголовок', flex: 1 },
	{ field: 'request_status', headerName: 'Статус', flex: 1 },
]

export default function Requests({ residentNames }: requestProps) {
	const [requests, setRequests] = useState([])
	const [oldDialogOpen, setOldDialogOpen] = useState(false)
	const [requestId, setRequestId] = useState<number>(0)
	function handelOpen() {
		setOldDialogOpen(true)
	}
	function handleClose() {
		setOldDialogOpen(false)
	}
	useEffect(() => {
		fetchData();
		// console.log(residentNames)
	}, [])
	async function handleFormSubmit(formData: any) {
		console.log(formData)
		console.log('submited form')
		try {
			const response = await axios.post('/api/requests', {
				date: new Date(Date.parse(formData.date)),
				title: formData.title,
				description: formData.description,
				request_status_idrequest_status: 1,
				resident_idresidents: formData.resident.id,
			})
		} catch (err) {
			// console.log(err.message)
			console.log('error in handle submit')
		}
		fetchData();
	}

	const handleRowClick: GridEventListener<'rowClick'> = (params) => {
		setRequestId(Number(params.id))
		handelOpen();
	};
	async function fetchData() {
		const { data } = await axios.get('/api/requests')
		setRequests(data)
		// console.log(data)
		// setResidentList(res)
	}
	return (
		<Layout>
			<div>Заявки</div>
			{oldDialogOpen ?
				<RequestDialog
					requestId={requestId}
					open={true}
					handleClose={handleClose}
				/> : <></>}
			<NewRequestDialog residentNames={residentNames} handleFormSubmit={handleFormSubmit}></NewRequestDialog>
			<div style={{ height: '500px' }} >
				<DataGrid
					rows={requests}
					onRowClick={handleRowClick}
					rowHeight={60}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
				/>
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {

	// Fetch data from external API
	const resp = await axios.get('http://localhost:3000/api/residents')
	const data: IResident[] = resp.data
	const resindentNames = data.map(resident => { return { name: resident.name, id: resident.id } })



	// Pass data to the page via props
	return { props: { residentNames: resindentNames } }
}
