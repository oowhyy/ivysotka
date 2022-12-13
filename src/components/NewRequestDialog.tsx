
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

interface formData {
	date: Date,
	resident: { name: string, id: number },
	title: string,
	description: string
}
export default function NewRequestDialog({ residentNames, handleFormSubmit }: any) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState<formData>({ date: new Date(), resident: residentNames[0], title: '', description: '' })
	const [chosenResident, setChosenResident] = useState(residentNames[0])
	function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.id]: e.target.value })
		console.log(e.target.value)
		// console.log(residentNames)
	}
	function submit() {
		handleFormSubmit(formData)
		setOpen(false)
		setFormData({ date: new Date(), resident: residentNames[0], title: '', description: '' })
		setChosenResident(residentNames[0])
	}
	function handleResidentChange(e: SyntheticEvent, r: any) {
		// console.log(residentNames)
		if (r) {
			setChosenResident(r)
			setFormData({ ...formData, resident: r })
		}
	}
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				color="primary"
				size="large"
				variant="contained"
				onClick={handleClickOpen}>
				Новая заявка
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Новая заявка</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="date"
						type="date"
						fullWidth
						label='Дата'
						defaultValue={'2022-12-11'}
						variant="outlined"
						onChange={handleFormChange}
					/>
					<Autocomplete
						disablePortal
						id="resident"
						value={chosenResident}
						options={residentNames}
						renderInput={(params) => <TextField {...params} label="Жилец" />}
						getOptionLabel={(option) => option.name}
						onChange={handleResidentChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Заголовок"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handleFormChange}
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
						onChange={handleFormChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button color='error' onClick={handleClose}>Закрыть</Button>
					<Button onClick={submit}>Записать</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}