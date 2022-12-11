
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';


export default function RequestDialog(
	{
		handleFormSubmit,
		handleOpen,
		handleClose,
		requestId,
		open }: any
) {
	const [data, setData] = useState<any>(null)
	async function fetchData() {
		try {
			const { data } = await axios.get(`api/requests/${requestId}`)
			setData(data)
		} catch (err) {

		}

	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Заявка</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>
						To subscribe to this website, please enter your email address here. We
						will send updates occasionally.
					</DialogContentText> */}
					<TextField

						autoFocus
						margin="dense"
						id="date"
						type="text"
						fullWidth
						variant="outlined"
						value={data ? data.date : ''}
					/>
					<TextField

						autoFocus
						margin="dense"
						id="name"
						type="text"
						fullWidth
						variant="outlined"
						value={data ? data.resident : ''}
					/>
					<TextField
						autoFocus

						margin="dense"
						id="title"
						label="Заголовок"
						type="text"
						fullWidth
						variant="outlined"
						value={data ? data.title : ''}

					/>
					<TextField
						autoFocus

						margin="dense"
						id="description"
						label="Описание"
						multiline
						type="text"
						rows={3}
						fullWidth
						variant="outlined"
						value={data ? data.description : ''}
					/>
				</DialogContent>
				<DialogActions>
					<Button color='error' onClick={handleClose}>Закрыть</Button>
					{/* <Button onClick={submit}>Записать</Button> */}
				</DialogActions>
			</Dialog>

		</div>
	);
}