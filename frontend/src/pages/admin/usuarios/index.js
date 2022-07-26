import * as React from 'react';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import MenuAdmin from '../../../components/menu-admin';

import Footer from '../../../components/footer-admin'
import Paper from '@mui/material/Paper';
import api from '../../../services/api';

const mdTheme = createTheme();

export default function UsuariosListagem() {

  const [usuarios, setusuarios] = useState([]);

  useEffect(() => {
    async function loadUsuarios(){
      const response = await api.get("/api/usuarios");
      console.log(response)
      setusuarios(response.data);
    }
    loadUsuarios();
  }, []);

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este usuarios?")){
      var result = await api.delete('/api/usuarios/'+id);
      if(result.status === 200){
        window.location.href = '/admin/usuarios';
      } else {
        alert('Ocorreu um erro. Por favor tente novamente!')
      }
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={'USUARIO'}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={12}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}>
                  <h2>Listagem de Usuários</h2>
                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button color='primary' href={'/admin/usuarios/cadastrar/'}>Novo Usuário</Button>
                  </ButtonGroup>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Tipo</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {usuarios.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.nome_usuario}
                                </TableCell>
                                <TableCell align="center">{row.email_usuario}</TableCell>
                                <TableCell align="center">{row.tipo_usuario===1?<Chip label="Administrador" color='primary'/>:<Chip label="Funcionário" color='secondary'/>}</TableCell>
                                <TableCell align="center">
                                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button color='primary' href={'/admin/usuarios/editar/'+row._id}>Atualizar</Button>
                                    <Button color='secondary' onClick={() => handleDelete(row._id)}>Excluir</Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 50 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}