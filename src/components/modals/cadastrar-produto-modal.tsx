'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CadastrarProdutoForm } from '../Forms/produto/cadastrar-produto';

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

export default function CadastrarProdutoModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = (id: number) => {
        console.log(`Delete row with id: ${id}`);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', paddingRight: { xs: '5%', sm: '10%', md: '15%', lg: '27%', xl: '25%' } }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleOpen}
                >
                    Novo
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
                        Cadastrar Produto
                    </Typography>
                    <hr />
                    <CadastrarProdutoForm/>
                </Box>
            </Modal>
        </div>
    );
}
