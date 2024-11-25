'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { EditarProdutoForm } from '../Forms/produto/editar-produto';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface EditarModalProps {
    id: number;
}

export default function EditarProdutoModal({ id }: EditarModalProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = async (id: number) => {
        const response = await axios.delete(
            'http://localhost:3001/product/' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            }
        );
        if (response.data) {
            toast(response.data.message);
            window.location.reload();
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleOpen}
                    sx={{ mr: 1 }}
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(id)}
                    
                >
                    Excluir
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar Produto
                    </Typography>
                    <hr />
                    <EditarProdutoForm id={id}/>
                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
}
