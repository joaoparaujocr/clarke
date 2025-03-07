import { Avatar, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SuppliersQuery } from '../../../__generated__/graphql';
import { formatMoney } from '../../../utils/formatMoney';

const columns: GridColDef<(SuppliersQuery['suppliers'])[number]>[] = [
  {
    field: 'logoUrl',
    headerName: '',
    width: 70,
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    disableReorder: true,
    resizable: false,
    renderCell: ({ value }) => (
      <Box display="flex" alignItems='center' justifyContent='center' height='100%'>
        <Avatar src={value} slotProps={{
          img: {
            loading: 'lazy',
          }
        }} />
      </Box>
    ),
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'minimumKwhLimit',
    headerName: 'Limite mínimo de kWh',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'state',
    headerName: 'Estado',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'costPerKwh',
    headerName: 'Custo/Kwh',
    type: 'number',
    width: 310,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (value) => {
      console.log(value)
      return formatMoney(value)
    }
  },
  {
    field: 'evaluationAverage',
    headerName: 'Média de avaliação',
    type: 'custom',
    width: 220,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ value }) => (
      <Box display="flex" alignItems='center' justifyContent='center' height='100%'>
        <Rating name="half-rating-read" value={value || 0} precision={0.5} readOnly />
      </Box>
    )
  },
];

interface DataSuppliersGridProps {
  rows?: SuppliersQuery['suppliers']
}

export default function DataSuppliersGrid({ rows }: DataSuppliersGridProps) {
  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}