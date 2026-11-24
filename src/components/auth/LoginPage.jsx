import React, { useState } from 'react';
import { api } from '../../services/api';

function LoginPage({ onSucessoLogin, onVoltarHome }) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setAviso('');
    setCarregando(true);

    try {
      if (modoCadastro) {
        await api.registrar({ nome, email, senha });
        setModoCadastro(false);
        setAviso('Conta criada! Agora faça seu login.');
      } else {
        const resultado = await api.login(email, senha);
        onSucessoLogin?.(resultado.usuario);
      }
    } catch (err) {
      setErro(err.message || 'Não foi possível concluir a operação.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: '420px' }}>
      <div className="mb-3">
        <button
          type="button"
          onClick={onVoltarHome}
          className="btn btn-link p-0 text-decoration-none"
          style={{ color: '#0077c8', fontSize: '14px' }}
        >
          &larr; Voltar para a loja
        </button>
      </div>

      <h2 className="text-center fw-bold mb-4" style={{ fontSize: '20px', color: '#222' }}>
        {modoCadastro ? 'Criar conta' : 'Entrar com email e senha'}
      </h2>

      {erro && (
        <div className="alert alert-danger py-2" style={{ fontSize: '13px' }}>
          {erro}
        </div>
      )}

      {aviso && (
        <div className="alert alert-success py-2" style={{ fontSize: '13px' }}>
          {aviso}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {modoCadastro && (
          <div className="mb-3">
            <label className="form-label mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ borderRadius: '4px', padding: '10px 12px', fontSize: '14px' }}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Ex.: exemplo@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderRadius: '4px', padding: '10px 12px', fontSize: '14px' }}
          />
        </div>

        <div className="mb-2">
          <label className="form-label mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>
            Senha
          </label>
          <div className="input-group">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              className="form-control"
              placeholder="Adicione sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ borderRadius: '4px 0 0 4px', padding: '10px 12px', fontSize: '14px' }}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setMostrarSenha((prev) => !prev)}
              aria-label="Mostrar ou ocultar senha"
              style={{ borderColor: '#ced4da' }}
            >
              <i className={`bi ${mostrarSenha ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
        </div>

        {!modoCadastro && (
          <div className="text-end mb-3">
            <button
              type="button"
              onClick={() => setAviso('Recuperação de senha ainda não implementada.')}
              className="btn btn-link p-0 text-decoration-underline"
              style={{ fontSize: '12px', color: '#444' }}
            >
              Esqueci minha senha
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="btn w-100 fw-bold text-white mt-2"
          style={{
            backgroundColor: '#0077c8',
            border: 'none',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '14px',
          }}
        >
          {carregando ? 'Aguarde...' : modoCadastro ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          type="button"
          onClick={() => {
            setErro('');
            setAviso('');
            setModoCadastro((prev) => !prev);
          }}
          className="btn btn-link p-0 text-decoration-underline"
          style={{ fontSize: '12px', color: '#333' }}
        >
          {modoCadastro ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Cadastre-se'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;