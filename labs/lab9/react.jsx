import React, { useState } from 'react';

// === Product Component ===
function Product({ name, description, display }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="product" style={{ display: display ? 'block' : 'none' }}>
            <h3>{name}</h3>
            <p>{description}</p>
            <button onClick={() => setLiked(!liked)}>
                {liked ? 'Đã thích' : 'Thích'}
            </button>
        </div>
    );
}

// === ProductList Component ===
function ProductList({ products, searchTerm }) {
    const filteredProducts = products.map(product => ({
        ...product,
        display:
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
    }));

    return (
        <div>
            {filteredProducts.map((product, index) => (
                <Product
                    key={index}
                    name={product.name}
                    description={product.description}
                    display={product.display}
                />
            ))}
        </div>
    );
}

// === SearchBar Component ===
function SearchBar({ onSearch }) {
    return (
        <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => onSearch(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
        />
    );
}

// === SearchableProductList Component ===
function SearchableProductList({ products }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <SearchBar onSearch={setSearchTerm} />
            <ProductList products={products} searchTerm={searchTerm} />
        </div>
    );
}

// === App Component (Root) ===
const initialProducts = [
    { name: 'Dell Laptops', description: 'Laptops from Dell' },
    { name: 'Dell PCs', description: 'PCs from Dell' },
    { name: 'HP Laptops', description: 'Laptops from HP' },
];

function App() {
    return (
        <div className="container" style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Ứng dụng tìm kiếm sản phẩm</h1>
            <SearchableProductList products={initialProducts} />
        </div>
    );
}

export default App;