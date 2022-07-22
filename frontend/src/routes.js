import React from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Estoque from './pages/admin/estoques';
import EstoqueEditar from './pages/admin/estoques/estoques.editar';
import EstoqueCadastrar from './pages/admin/estoques/estoques.cadastrar';

import Produtos from './pages/admin/produtos';
import ProdutosEditar from './pages/admin/produtos/produtos.editar';
import ProdutosCadastrar from './pages/admin/produtos/produtos.cadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuariosEditar from './pages/admin/usuarios/usuarios.editar';
import UsuariosCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

// IMPORTS CLIENT
import Home from './pages/client/home';
import ProdutosDetails from './pages/client/produtos/produtos.details';
import EstoqueDetails from './pages/client/estoques/estoques.details';

export default function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Rota Cliente */}
                <Route path="/" exact element={<Home/>}/>
                <Route path="/produtos/:idProduto" exact element={<ProdutosDetails/>}/>
                <Route path="/produtos/:idEstoque" exact element={<EstoqueDetails/>}/>

                {/* Rota Admin */}
                <Route path="/admin" exact element={<Dashboard/>}/>

                <Route path="/admin/estoques" exact element={<Estoque/>}/>
                <Route path="/admin/estoques/cadastrar" exact element={<EstoqueCadastrar/>}/>
                <Route path="/admin/estoques/editar/:idEstoque" exact element={<EstoqueEditar/>}/>

                <Route path="/admin/produtos" exact element={<Produtos/>}/>
                <Route path="/admin/produtos/cadastrar" exact element={<ProdutosCadastrar/>}/>
                <Route path="/admin/produtos/editar/:idProduto" exact element={<ProdutosEditar/>}/>

                <Route path="/admin/usuarios" exact element={<Usuarios/>}/>
                <Route path="/admin/usuarios/cadastrar" exact element={<UsuariosCadastrar/>}/>
                <Route path="/admin/usuarios/editar/:idUsuario" exact element={<UsuariosEditar/>}/>
            </Routes>
        </BrowserRouter>
    )
}