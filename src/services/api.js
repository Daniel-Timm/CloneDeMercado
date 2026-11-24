const API_URL = 'http://localhost:3001';
const TOKEN_KEY = 'meu_mercado_token';
const USER_KEY = 'meu_mercado_usuario';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getUsuario: () => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  salvarSessao: (token, usuario) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (usuario) localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  },
  limparSessao: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

async function buscar(endpoint, options = {}) {
  const token = authStorage.getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.erro || data.mensagem || `Erro na requisição (${response.status})`);
  }

  return data;
}

export const api = {
  listarProdutos: () => buscar('/produtos'),
  listarCategorias: () => buscar('/categorias'),
  listarColecoes: () => buscar('/colecoes'),
  listarBanners: () => buscar('/banners'),

  login: async (email, senha) => {
    const data = await buscar('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
    const token = data.token || data.accessToken;
    const usuario = data.usuario || data.user || { email };
    if (token) {
      authStorage.salvarSessao(token, usuario);
    }
    return { token, usuario, raw: data };
  },

  registrar: (payload) =>
    buscar('/auth/registrar', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  criarCategoria: (payload) =>
    buscar('/categorias', { method: 'POST', body: JSON.stringify(payload) }),
  deletarCategoria: (id) =>
    buscar(`/categorias/${id}`, { method: 'DELETE' }),

  criarProduto: (payload) =>
    buscar('/produtos', { method: 'POST', body: JSON.stringify(payload) }),

  criarBanner: (payload) =>
    buscar('/banners', { method: 'POST', body: JSON.stringify(payload) }),
  deletarBanner: (id) =>
    buscar(`/banners/${id}`, { method: 'DELETE' }),

  criarColecao: (payload) =>
    buscar('/colecoes', { method: 'POST', body: JSON.stringify(payload) }),
  vincularProdutoColecao: (colecaoId, produtoId) =>
    buscar(`/colecoes/${colecaoId}/produtos`, {
      method: 'POST',
      body: JSON.stringify({ produtoId }),
    }),
};