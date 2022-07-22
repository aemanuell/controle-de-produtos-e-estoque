import * as React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin'
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
}));


const mdTheme = createTheme();

export default function ProdutosCadastrar() {
  

  const [nome, setNome] = useState('');
   const [descricao, setDescricao] = useState('');
   const [preco, setPreco] = useState('');
   const [qtd, setQtd] = useState('');
   const {idProduto} = useParams();

   useEffect(() => {
    async function getProduto(){
      var response = await api.get('/api/produtos.details/'+idProduto);
      console.log(response.data)
      
      setNome(response.data.nome_produto);
      setDescricao(response.data.descricao_produto);
      setPreco(response.data.preco_produto);
      setQtd(response.data.qtd_produto);
    }

    getProduto();
   },[])

   async function handleSubmit() {
     const data = {nome_produto:nome, descricao_produto:descricao, preco_produto:preco, qtd_produto:qtd, _id:idProduto}

      if(nome!==''&&descricao!==''&&preco!==''&&qtd!==''){
        const response = await api.put('/api/produtos/', data)

        if(response.status === 200) {
          window.location.href = "/admin/produtos"
        }else {
          alert('Erro ao atualizar estoque');
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
        <MenuAdmin title={'PRODUTOS'}/>
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
                    Atualização de Produtos
                  </Typography>
                  <Grid container spacing={3}>
                      <Grid item xs={12}>
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
                      <TextField type="number"
                          required
                          id="quantidade"
                          name="quantidade"
                          label="Quantidade"
                          fullWidth
                          autoComplete="quantidade"
                          value= {qtd}
                          onChange={e => setQtd(e.target.value)}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField type="number"
                          required
                          id="numeracao"
                          name="numeracao"
                          label="Preço"
                          fullWidth
                          autoComplete="numeracao"
                          value={preco}
                          onChange={e => setPreco(e.target.value)}
                      />
                      </Grid>
                      <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="Descrição*"  style={{width: "100%", marginTop: "30px", marginLeft: "30px", borderRadius: "0px", padding: "5px", fontSize: "15px"}}
                          required
                          id="descricao"
                          name="descricao"
                          fullWidth
                          autoComplete="descricao"
                          value={descricao}
                          onChange={e => setDescricao(e.target.value)}
                      />
                  </Grid>
                  <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center" style={{width: "100%", marginTop: "10px"}}>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Salvar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary" href="/admin/produtos">
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