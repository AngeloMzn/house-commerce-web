'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditarModal from '../modals/editar-produto-modal';



const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90, headerAlign: 'center', align: 'center' },
  {
    field: 'descricao',
    headerName: 'Descrição',
    width: 150,
    editable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'preco',
    headerName: 'Preço',
    width: 150,
    editable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    type: 'number',
    width: 110,
    editable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'acao',
    headerName: 'Ação',
    sortable: false,
    width: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <EditarModal id={params.row.id} />
    ),
  },
];

const rows = [
  { id: 1, descricao: 'Snow', preco: 'Jon', tipo: 14 },
  { id: 2, descricao: 'Lannister', preco: 'Cersei', tipo: 31 },
  { id: 3, descricao: 'Lannister', preco: 'Jaime', tipo: 31 },
  { id: 4, descricao: 'Stark', preco: 'Arya', tipo: 11 },
  { id: 5, descricao: 'Targaryen', preco: 'Daenerys', tipo: 123 },
  { id: 6, descricao: 'Melisandre', preco: 123, tipo: 150 },
  { id: 7, descricao: 'Clifford', preco: 'Ferrara', tipo: 44 },
  { id: 8, descricao: 'Frances', preco: 'Rossini', tipo: 36 },
  { id: 9, descricao: 'Roxie', preco: 'Harvey', tipo: 65 },
];

export default function Table() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        paddingTop: '20px',
      }}
    >
      <Box sx={{ height: 400, width: 700 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </Box>
  );
}