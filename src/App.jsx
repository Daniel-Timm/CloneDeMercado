import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainHeader from './components/header/MainHeader';
import NavBar from './components/header/NavBar';
import TopBar from './components/header/TopBar';
import Banner from './components/home/Banner';
import Sectors from './components/home/Sectors';
import PromoBannersGrid from './components/home/PromoBannersGrid';
import ProductSection from './components/ProductCard/ProductSection';
import LoginPage from './components/auth/LoginPage';
import AdminPanel from './components/admin/AdminPanel';

import { api, authStorage } from './services/api';
import { ofertasDoDia, descontosEspeciais } from './data/Product';

function normalizarProduto(produto) {
  const precoAtual = Number(produto.precoAtual ?? produto.preco ?? 0);
  const precoOriginalRaw = produto.precoOriginal;
  const precoOriginal =
    precoOriginalRaw !== null && precoOriginalRaw !== undefined && Number(precoOriginalRaw) > precoAtual
      ? Number(precoOriginalRaw)
      : precoAtual;

  return {
    id: produto.id,
    nome: produto.nome,
    precoAtual,
    precoOriginal,
    unidade: produto.unidade ?? '',
    urlImagem: produto.imagemUrl ?? produto.urlImagem ?? '',
    estoque: Number(produto.estoque ?? 0),
  };
}

function App() {
  const [pagina, setPagina] = useState('home');
  const [usuario, setUsuario] = useState(() => authStorage.getUsuario());
  const [secoesColecoes, setSecoesColecoes] = useState([]);
  const [produtosApi, setProdutosApi] = useState([]);
  const [bannersGrid, setBannersGrid] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [bannersTopo, setBannersTopo] = useState([]);
 

  const carregarHome = useCallback(async () => {
    setCarregando(true);
    try {
      const [colecoesData, produtosData, bannersData] = await Promise.all([
        api.listarColecoes().catch(() => []),
        api.listarProdutos().catch(() => []),
        api.listarBanners().catch(() => []),
      ]);

      const listaProdutos = Array.isArray(produtosData)
        ? produtosData.map(normalizarProduto)
        : [];
      setProdutosApi(listaProdutos);

      if (Array.isArray(bannersData)) {
  const ativos = bannersData
    .filter((b) => b.ativo !== false)
    .sort((a, b) => Number(a.ordem) - Number(b.ordem));

  const topo = ativos.filter((b) => Number(b.ordem) === 1);
  const secundarios = ativos.filter((b) => Number(b.ordem) >= 2);

  setBannersTopo(topo.length > 0 ? topo : ativos.slice(0, 1));
  setBannersGrid(secundarios);
} else {
  setBannersTopo([]);
  setBannersGrid([]);
}
      


      if (Array.isArray(colecoesData) && colecoesData.length > 0) {
        const formatadas = colecoesData
          .filter((col) => col.ativa !== false)
          .map((col) => {
            const brutos = Array.isArray(col.produtos)
              ? col.produtos.map((p) => p.produto || p)
              : [];

            return {
              id: col.id,
              titulo: col.nome,
              lista: brutos.map(normalizarProduto),
            };
          })
          .filter((sec) => sec.lista.length > 0);

        setSecoesColecoes(formatadas);
      } else {
        setSecoesColecoes([]);
      }
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarHome();
  }, [carregarHome]);

  function irParaHome() {
    setPagina('home');
    carregarHome();
  }

  function handleLogout() {
    authStorage.limparSessao();
    setUsuario(null);
    setPagina('home');
  }

  const temColecoesComProdutos = secoesColecoes.length > 0;
  const temProdutosAvulsos = produtosApi.length > 0;

  return (
    <div className="app-container">
      <header>
        <TopBar />
        <div className="sticky-top bg-white shadow-sm" style={{ top: 0, zIndex: 1020 }}>
          <MainHeader
            usuario={usuario}
            onAbrirLogin={() => setPagina('login')}
            onAbrirAdmin={() => setPagina('admin')}
            onVoltarHome={irParaHome}
            onLogout={handleLogout}
          />
          <NavBar />
        </div>
      </header>

      <main>
        {pagina === 'login' ? (
          <LoginPage
            onVoltarHome={irParaHome}
            onSucessoLogin={(userLogado) => {
              setUsuario(userLogado);
              setPagina('home');
            }}
          />
        ) : pagina === 'admin' && usuario?.papel === 'ADMIN' ? (
          <AdminPanel onVoltarHome={irParaHome} />
        ) : (
          <>
            <Banner  banners={bannersTopo}/>
            <Sectors />

            {carregando ? (
              <div className="container py-4 text-muted">Carregando ofertas...</div>
            ) : temColecoesComProdutos ? (
              <>
                <ProductSection
                  key={secoesColecoes[0].id}
                  titulo={secoesColecoes[0].titulo}
                  lista={secoesColecoes[0].lista}
                />

                <PromoBannersGrid banners={bannersGrid} />

                {secoesColecoes.slice(1).map((secao) => (
                  <ProductSection key={secao.id} titulo={secao.titulo} lista={secao.lista} />
                ))}
              </>
            ) : temProdutosAvulsos ? (
              <>
                <ProductSection titulo="Produtos em Destaque" lista={produtosApi} />
                <PromoBannersGrid banners={bannersGrid} />
              </>
            ) : (
              <>
                <ProductSection titulo="Ofertas do Dia" lista={ofertasDoDia} />
                <PromoBannersGrid banners={bannersGrid} />
                <ProductSection titulo="Descontos especiais" lista={descontosEspeciais} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;