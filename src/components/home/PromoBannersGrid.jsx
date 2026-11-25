import React from 'react';

const BANNERS_PADRAO = [
  {
    id: 'padrao-acougue',
    titulo: 'Açougue - Carnes e Aves',
    imagemUrl: 'https://placehold.co/600x260/f39200/ffffff?text=Acougue+-+Confira',
    linkUrl: '#acougue',
  },
  {
    id: 'padrao-hortifruti',
    titulo: 'Hortifruti - Frutas, legumes e vegetais',
    imagemUrl: 'https://placehold.co/600x260/769e2d/ffffff?text=Hortifruti+-+Confira',
    linkUrl: '#hortifruti',
  },
  {
    id: 'padrao-limpeza',
    titulo: 'Limpeza - Itens essenciais',
    imagemUrl: 'https://placehold.co/600x260/0066b3/ffffff?text=Limpeza+-+Confira',
    linkUrl: '#limpeza',
  },
  {
    id: 'padrao-higiene',
    titulo: 'Higiene & Beleza',
    imagemUrl: 'https://placehold.co/600x260/0077c8/ffffff?text=Higiene+%26+Beleza+-+Confira',
    linkUrl: '#higiene',
  },
];

function PromoBannersGrid({ banners = [] }) {
  // Pega até 4 banners secundários (ordem >= 2) vindos da API; se não houver, usa os padrões
  const itens = banners.length > 0 ? banners.slice(0, 4) : BANNERS_PADRAO;

  return (
    <section className="container my-4">
      <div className="row g-3">
        {itens.map((banner) => (
          <div key={banner.id} className="col-12 col-md-6">
            <a
              href={banner.linkUrl || '#'}
              className="d-block overflow-hidden rounded-3 shadow-sm promo-banner-card"
              style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            >
              <img
                src={banner.imagemUrl}
                alt={banner.titulo}
                className="img-fluid w-100"
                style={{
                  objectFit: 'cover',
                  aspectRatio: '21 / 9',
                  display: 'block',
                }}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PromoBannersGrid;