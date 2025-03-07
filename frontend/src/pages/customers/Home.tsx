import { IconButton, InputAdornment, InputBase, Paper, Stack } from "@mui/material";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import DataSuppliersGrid from "../../components/pages/Home/DataSuppliersGrid";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from "react";

const GET_SUPPLIERS = gql(`
  query Suppliers($search: Float) {
    suppliers(search: $search) {
      costPerKwh
      evaluationAverage
      id
      logoUrl
      minimumKwhLimit
      name
      state
    }
  }
`)

export default function Home() {
  const [search, setSearch] = useState('')
  const { data, refetch } = useQuery(GET_SUPPLIERS, { skip: !search, variables: { search: (search && Number(search)) || undefined } })

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setSearch(value);
  };

  const handleSubmitSearch = async () => {
    await refetch({ search: (search && Number(search)) || undefined })
  }

  return (
    <Stack direction='column' height='100%' width='100%' gap={3} sx={{
      padding: '0 20px'
    }}>
      <Stack direction='row'>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Digite seu valor de consumo mensal em KWh"
            inputProps={{
              'aria-label': 'Digite seu valor de consumo mensal em KWh',
              inputMode: "numeric",
              pattern: "[0-9]*"
            }}
            startAdornment={<InputAdornment position="start">kWh</InputAdornment>}
            value={search}
            onChange={handleInputSearch}
          />
          <IconButton type="button" sx={{ p: '10px', border: 'none' }} aria-label="search" onClick={handleSubmitSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Stack>
      <DataSuppliersGrid rows={data?.suppliers} />
    </Stack>
  )
}