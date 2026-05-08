import React from 'react';

function NavBar() {
    return (
         <div className=' text-white' style={{backgroundColor:'#0088cc'}}>
            
            <div className='container '>
                <div className='d-flex aling-itens-center py-0'>
                    <div className='todosCorredores py-2 p-3 ' 
                    style={{
                        backgroundColor: '#1a5896',
                        cursor:'pointer',
                        
                       
                        justifyContent: 'center',
                        

                    }}>
                      ☰ Todos os Corredores  
                    </div>
                    <div className='d-flex gap-4 align-items-center ms-auto' >
                        <span className='ms-5' style={{cursor: 'pointer'}}>Ofertas de Hoje</span>
                        <span className='ms-5' style={{cursor: 'pointer' }}>Descontos Especiais</span>
                        <span className='ms-5' style={{cursor: 'pointer' }}>Carnes</span>
                        <span className='ms-5' style={{cursor: 'pointer' }}>Produtos Especiais</span>
                        <span className='ms-5' style= {{cursor: 'pointer'}}>Vinhos Importados</span>
                        <span className='ms-5' style= {{cursor: 'pointer'}}>Mercearia</span>
                    </div>
                </div>
            </div>

         </div>
    );
}
export default NavBar; 