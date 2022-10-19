import React from 'react';
import {CreateOrder} from './OrderCRUD'
import {CreateForm, EditForm} from './CRUDForms'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SellerRow from './SellerRow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function EditOrderModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
    const closeModal = () => {setOpen(false);}
    const order = props.order;
    const newOrder = (order) => {
        props.newOrder(order)
    }

  return (
    <div>
        <IconButton onClick={handleOpen} >
            <EditIcon />
        </IconButton>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar Pedido
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <EditForm order={props.order} closeModal={closeModal} newOrder={newOrder} />
            </Typography>
        </Box>
        </Modal>
    </div>
  );
}

export function AddOrderModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {e.stopPropagation(); setOpen(true);}
    const handleClose = (e) => {e.stopPropagation(); setOpen(false);}
    const closeModal = () => {setOpen(false);}

    const handleModalClick = e => {     
        e.stopPropagation();
      }; 

    const refresh = () => {
        props.refresh();
    }
  
    return (
      <div>
          <IconButton onClick={handleOpen} >
              <AddIcon />
          </IconButton>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClick={handleModalClick}
          >
          <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  Crear Pedido
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <CreateForm id={props.seller.id} closeModal={closeModal} refresh={refresh} ></CreateForm>   
              </Typography>
          </Box>
          </Modal>
      </div>
    );
  }
