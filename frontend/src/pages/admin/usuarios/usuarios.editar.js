import * as React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',  16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  formControl:{
    width: '100%'
  }
}));


const mdTheme = createTheme();

export default function UsuariosCadastrar() {
  

  const [nome, setNome] = useState('');
   const [email, setEmail] = useState('');
   const [tipo, setTipo] = useState('');
   const [senha, setSenha] = useState('');
   const {idUsuario} = useParams();

   useEffect(() => {
    async function getUsuario(){
      var response = await api.get('/api/usuarios.details/'+idUsuario);
      console.log(response.data)
      
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setTipo(response.data.tipo_usuario);
      setSenha(response.data.senha_usuario);
    }

    getUsuario();
   },[])

   async function handleSubmit() {
     const data = {nome_usuario:nome, email_usuario:email, tipo_usuario:tipo, senha_usuario:senha, _id:idUsuario}

      if(nome!==''&&email!==''&&tipo!==''&&senha!==''){
        const response = await api.put('/api/usuarios/', data)

        if(response.status === 200) {
          window.location.href = "/admin/usuarios"
        }else {
          alert('Erro ao atualizar usuario');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
   }

  const classes = useStyles();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={'USUÁRIOS'}/>
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
                    height: 480,
                  }}>
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Atualização de Usuários
                  </Typography>
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                      <TextField
                          required
                          id="nome"
                          name="nome"
                          label="Nome"
                          fullWidth
                          autoComplete="nome"
                          value={nome}
                          onChange={e => setNome(e.target.value)}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          fullWidth
                          autoComplete="email"
                          value= {email}
                          onChange={e => setEmail(e.target.value)}
                      />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="labelTipo">Tipo</InputLabel>
                        <Select
                          labelId="labelTipo"
                          id="tipo"
                          value={tipo}
                          onChange={e => setTipo(e.target.value)}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Funcionário</MenuItem>
                        </Select>
                      </FormControl>  
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          required
                          fullWidth
                          name="senha"
                          label="Senha"
                          type="password"
                          id="senha"
                          autoComplete="senha"
                          value={senha}
                          onChange={e => setSenha(e.target.value)}
                        />
                      </Grid>
                  </Grid>
                  <div className={classes.heroButtons}>
                  <Grid container spacing={3} justify="center" style={{width: "100%", marginTop: "10px"}}>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Salvar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary" href="/admin/usuarios">
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                </div>
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}