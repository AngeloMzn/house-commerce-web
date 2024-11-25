'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditarModal from '../modals/editar-produto-modal';
import axios from 'axios';

interface Product {
  id: number;
  descricao: string;
  preco: number | string;  
  tipo: number;
}

export default function Table() {
  const [products, setProducts] = useState<Product[]>([]);

  const columns: GridColDef[] = [
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
      renderCell: (params: GridRenderCellParams<Product>) => (
        <EditarModal id={params.row.id} />
      ),
    },
  ];


  async function fetchProducts(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      });
      console.log('Response:', response.data);
      if (response.data) {
        const rows = response.data.map((product: any) => ({
          id: product.id,
          descricao: product.description,  
          preco: product.price,            
          tipo: product.type,              
        }));
        console.log('Rows:', rows);
        setProducts(rows);  
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []); 

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
          rows={products} 
          columns={columns}
          paginationModel={{ pageSize: 5, page: 0 }}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
