import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material"
import { ChangeEvent } from "react";


interface ModalProps {
   formData: {
      name: string;
      email: string;
      flat_num: string;
      phone_num: string
   }
   handleClose: () => void
   handleSubmitForm: () => void
   handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void
   open: boolean
}

const NewResidentModal = ({ formData, handleClose, handleSubmitForm, handleFormChange, open }: ModalProps) => {
   return (
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
               value={formData.name}
               onChange={handleFormChange}
            />
            <TextField
               autoFocus
               margin="dense"
               id="flat_num"
               label="Квартира"
               type="text"
               fullWidth
               variant="standard"
               placeholder="10"
               value={formData.flat_num}
               onChange={handleFormChange}
            />
            <TextField
               autoFocus
               margin="dense"
               id="email"
               label="email"
               type="text"
               fullWidth
               variant="standard"
               placeholder="petya@mymail.com"
               value={formData.email}
               onChange={handleFormChange}
            />

            <TextField
               autoFocus
               margin="dense"
               id="phone_num"
               label="Номер телефона"
               type="text"
               fullWidth
               variant="standard"
               placeholder="+79008002121"
               value={formData.phone_num}
               onChange={handleFormChange}
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button onClick={handleSubmitForm}>Записать</Button>
         </DialogActions>
      </Dialog>
   )
}

export default NewResidentModal