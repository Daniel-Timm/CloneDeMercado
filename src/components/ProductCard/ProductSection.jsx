import ProductCard from './ProductCard'; 

function ProductSection({ titulo, lista }) { 
  return (
    <div className="container py-4">
      <h2 className="fw-bold fs-3 mb-3">{titulo}</h2>
      
      <div className="d-flex flex-nowrap overflow-x-auto gap-3 pb-3">
       
        {lista && lista.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
export default ProductSection;