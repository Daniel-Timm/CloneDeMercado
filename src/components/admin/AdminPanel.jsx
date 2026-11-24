import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

function AdminPanel({ onVoltarHome }) {
  const [aba, setAba] = useState('produtos');
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [colecoes, setColecoes] = useState([]);

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const [catNome, setCatNome] = useState('');
  const [catIcone, setCatIcone] = useState('');
  const [catOrdem, setCatOrdem] = useState(1);

  const [prodNome, setProdNome] = useState('');
  const [prodDescricao, setProdDescricao] = useState('');
  const [prodCodigoBarras, setProdCodigoBarras] = useState('');
  const [prodImagemUrl, setProdImagemUrl] = useState('');
  const [prodPreco, setProdPreco] = useState('');
  const [prodPrecoOriginal, setProdPrecoOriginal] = useState('');
  const [prodEstoque, setProdEstoque] = useState(50);
  const [prodCategoriaId, setProdCategoriaId] = useState('');

  const [banTitulo, setBanTitulo] = useState('');
  const [banImagemUrl, setBanImagemUrl] = useState('');
  const [banLinkUrl, setBanLinkUrl] = useState('');
  const [banOrdem, setBanOrdem] = useState(1);

  const [colNome, setColNome] = useState('');
  const [colSlug, setColSlug] = useState('');
  const [colOrdem, setColOrdem] = useState(1);
  const [vincularColId, setVincularColId] = useState('');
  const [vincularProdId, setVincularProdId] = useState('');

  async function carregarTudo() {
    try {
      const [cats, prods, bans, cols] = await Promise.all([
        api.listarCategorias().catch(() => []),
        api.listarProdutos().catch(() => []),
        api.listarBanners().catch(() => []),
        api.listarColecoes().catch(() => []),
      ]);
      setCategorias(Array.isArray(cats) ? cats : []);
      setProdutos(Array.isArray(prods) ? prods : []);
      setBanners(Array.isArray(bans) ? bans : []);
      setColecoes(Array.isArray(cols) ? cols : []);

      if (cats?.length > 0 && !prodCategoriaId) setProdCategoriaId(cats[0].id);
      if (cols?.length > 0 && !vincularColId) setVincularColId(cols[0].id);
      if (prods?.length > 0 && !vincularProdId) setVincularProdId(prods[0].id);
    } catch {
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  function limparAvisos() {
    setMensagem('');
    setErro('');
  }

  async function handleCriarCategoria(e) {
    e.preventDefault();
    limparAvisos();
    setSalvando(true);
    try {
      await api.criarCategoria({
        nome: catNome,
        icone: catIcone || undefined,
        ordem: Number(catOrdem),
      });
      setCatNome('');
      setCatIcone('');
      setMensagem('Categoria cadastrada com sucesso!');
      await carregarTudo();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleCriarProduto(e) {
    e.preventDefault();
    limparAvisos();
    setSalvando(true);
    try {
      await api.criarProduto({
        nome: prodNome,
        descricao: prodDescricao || undefined,
        codigoBarras: prodCodigoBarras || undefined,
        imagemUrl: prodImagemUrl || undefined,
        preco: Number(prodPreco),
        precoOriginal: prodPrecoOriginal ? Number(prodPrecoOriginal) : undefined,
        estoque: Number(prodEstoque),
        categoriaId: prodCategoriaId,
      });
      setProdNome('');
      setProdDescricao('');
      setProdCodigoBarras('');
      setProdImagemUrl('');
      setProdPreco('');
      setProdPrecoOriginal('');
      setMensagem('Produto cadastrado com sucesso!');
      await carregarTudo();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleCriarBanner(e) {
    e.preventDefault();
    limparAvisos();
    setSalvando(true);
    try {
      await api.criarBanner({
        titulo: banTitulo,
        imagemUrl: banImagemUrl,
        linkUrl: banLinkUrl || undefined,
        ordem: Number(banOrdem),
        ativo: true,
      });
      setBanTitulo('');
      setBanImagemUrl('');
      setBanLinkUrl('');
      setMensagem('Banner cadastrado com sucesso!');
      await carregarTudo();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleCriarColecao(e) {
    e.preventDefault();
    limparAvisos();
    setSalvando(true);
    try {
      await api.criarColecao({
        nome: colNome,
        slug: colSlug || colNome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
        ordem: Number(colOrdem),
        ativa: true,
      });
      setColNome('');
      setColSlug('');
      setMensagem('Coleção criada com sucesso!');
      await carregarTudo();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleVincularProduto(e) {
    e.preventDefault();
    limparAvisos();
    setSalvando(true);
    try {
      await api.vincularProdutoColecao(vincularColId, vincularProdId);
      setMensagem('Produto adicionado à coleção!');
      await carregarTudo();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: '850px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold fs-4 m-0">Painel de Cadastros</h2>
        <button
          type="button"
          onClick={onVoltarHome}
          className="btn btn-outline-primary btn-sm"
        >
          &larr; 
        </button>
      </div>

      {/* Abas */}
      <ul className="nav nav-tabs mb-4">
        {[
          { id: 'produtos', label: `Produtos (${produtos.length})` },
          { id: 'categorias', label: `Categorias (${categorias.length})` },
          { id: 'banners', label: `Banners (${banners.length})` },
          { id: 'colecoes', label: `Coleções (${colecoes.length})` },
        ].map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              type="button"
              className={`nav-link ${aba === tab.id ? 'active fw-bold' : ''}`}
              onClick={() => {
                limparAvisos();
                setAba(tab.id);
              }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {erro && <div className="alert alert-danger py-2">{erro}</div>}
      {mensagem && <div className="alert alert-success py-2">{mensagem}</div>}

      {/* ABA PRODUTOS */}
      {aba === 'produtos' && (
        <div className="card shadow-sm p-4">
          <h5 className="fw-bold mb-3">Novo Produto</h5>
          {categorias.length === 0 ? (
            <div className="alert alert-warning">
              Cadastre pelo menos uma <strong>Categoria</strong> antes de cadastrar produtos.
            </div>
          ) : (
            <form onSubmit={handleCriarProduto} className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Nome do Produto *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Café Melitta Tradicional 500g"
                  value={prodNome}
                  onChange={(e) => setProdNome(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Categoria *</label>
                <select
                  className="form-select"
                  value={prodCategoriaId}
                  onChange={(e) => setProdCategoriaId(e.target.value)}
                  required
                >
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Preço Atual (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="18.90"
                  value={prodPreco}
                  onChange={(e) => setProdPreco(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Preço Original / De (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="22.90"
                  value={prodPrecoOriginal}
                  onChange={(e) => setProdPrecoOriginal(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Estoque *</label>
                <input
                  type="number"
                  className="form-control"
                  value={prodEstoque}
                  onChange={(e) => setProdEstoque(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-8">
                <label className="form-label">URL da Imagem</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://..."
                  value={prodImagemUrl}
                  onChange={(e) => setProdImagemUrl(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Código de Barras</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="7891000100102"
                  value={prodCodigoBarras}
                  onChange={(e) => setProdCodigoBarras(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descrição curta do produto"
                  value={prodDescricao}
                  onChange={(e) => setProdDescricao(e.target.value)}
                />
              </div>

              <div className="col-12">
                <button type="submit" disabled={salvando} className="btn btn-primary fw-bold">
                  {salvando ? 'Salvando...' : 'Cadastrar Produto'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ABA CATEGORIAS */}
      {aba === 'categorias' && (
        <div className="card shadow-sm p-4">
          <h5 className="fw-bold mb-3">Nova Categoria</h5>
          <form onSubmit={handleCriarCategoria} className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Nome *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Hortifruti, Carnes, Bebidas..."
                value={catNome}
                onChange={(e) => setCatNome(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Ícone (opcional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: bi-basket"
                value={catIcone}
                onChange={(e) => setCatIcone(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Ordem</label>
              <input
                type="number"
                className="form-control"
                value={catOrdem}
                onChange={(e) => setCatOrdem(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button type="submit" disabled={salvando} className="btn btn-primary fw-bold">
                {salvando ? 'Salvando...' : 'Cadastrar Categoria'}
              </button>
            </div>
          </form>

          <h6 className="fw-bold">Categorias Cadastradas</h6>
          <ul className="list-group">
            {categorias.map((c) => (
              <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{c.nome}</span>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={async () => {
                    await api.deletarCategoria(c.id);
                    await carregarTudo();
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ABA BANNERS */}
      {aba === 'banners' && (
        <div className="card shadow-sm p-4">
          <h5 className="fw-bold mb-3">Novo Banner</h5>
          <form onSubmit={handleCriarBanner} className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Título *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Festival de Carnes"
                value={banTitulo}
                onChange={(e) => setBanTitulo(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Link ao clicar</label>
              <input
                type="text"
                className="form-control"
                placeholder="/colecoes/ofertas-da-semana"
                value={banLinkUrl}
                onChange={(e) => setBanLinkUrl(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Ordem</label>
              <input
                type="number"
                className="form-control"
                value={banOrdem}
                onChange={(e) => setBanOrdem(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">URL da Imagem *</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://..."
                value={banImagemUrl}
                onChange={(e) => setBanImagemUrl(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" disabled={salvando} className="btn btn-primary fw-bold">
                {salvando ? 'Salvando...' : 'Cadastrar Banner'}
              </button>
            </div>
          </form>

          <h6 className="fw-bold">Banners Ativos</h6>
          <ul className="list-group">
            {banners.map((b) => (
              <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img src={b.imagemUrl} alt={b.titulo} style={{ height: '36px', borderRadius: '4px' }} />
                  <span>{b.titulo}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={async () => {
                    await api.deletarBanner(b.id);
                    await carregarTudo();
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ABA COLEÇÕES */}
      {aba === 'colecoes' && (
        <div className="d-flex flex-column gap-4">
          <div className="card shadow-sm p-4">
            <h5 className="fw-bold mb-3">Nova Coleção (Vitrine da Home)</h5>
            <form onSubmit={handleCriarColecao} className="row g-3">
              <div className="col-md-5">
                <label className="form-label">Nome da Vitrine *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Ofertas do Dia"
                  value={colNome}
                  onChange={(e) => setColNome(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <label className="form-label">Slug (URL)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ofertas-do-dia"
                  value={colSlug}
                  onChange={(e) => setColSlug(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Ordem</label>
                <input
                  type="number"
                  className="form-control"
                  value={colOrdem}
                  onChange={(e) => setColOrdem(e.target.value)}
                />
              </div>
              <div className="col-12">
                <button type="submit" disabled={salvando} className="btn btn-primary fw-bold">
                  {salvando ? 'Salvando...' : 'Criar Coleção'}
                </button>
              </div>
            </form>
          </div>

          <div className="card shadow-sm p-4">
            <h5 className="fw-bold mb-3">Adicionar Produto em uma Coleção</h5>
            {colecoes.length === 0 || produtos.length === 0 ? (
              <p className="text-muted m-0">
                Cadastre pelo menos uma coleção e um produto para fazer o vínculo.
              </p>
            ) : (
              <form onSubmit={handleVincularProduto} className="row g-3">
                <div className="col-md-5">
                  <label className="form-label">Coleção</label>
                  <select
                    className="form-select"
                    value={vincularColId}
                    onChange={(e) => setVincularColId(e.target.value)}
                  >
                    {colecoes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Produto</label>
                  <select
                    className="form-select"
                    value={vincularProdId}
                    onChange={(e) => setVincularProdId(e.target.value)}
                  >
                    {produtos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" disabled={salvando} className="btn btn-success w-100 fw-bold">
                    Vincular
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;