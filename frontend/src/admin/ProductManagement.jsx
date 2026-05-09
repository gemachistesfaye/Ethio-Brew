import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, Search, Filter, AlertCircle } from 'lucide-react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // MOCK DATA for immediate preview (Will fetch from API in production)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coffee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="p-8 bg-[#FDFCF8] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#4B2C20] tracking-tight">Product Catalog</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Manage your coffee inventory</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#006341] text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:bg-[#004d32] transition active:scale-95"
        >
          <Plus size={20} /> Add New Coffee
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or region..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#006341] transition shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 py-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-2 font-bold text-gray-500 hover:bg-gray-50 transition">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-[32px] p-6 border border-gray-50 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
               <div className="w-16 h-16 bg-[#4B2C20]/5 rounded-2xl flex items-center justify-center text-[#4B2C20]">
                  <Package size={28} />
               </div>
               <div className="flex gap-2">
                  <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#006341] hover:bg-green-50 transition"><Edit2 size={16}/></button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 size={16}/>
                  </button>
               </div>
            </div>

            <h3 className="font-black text-xl text-[#4B2C20] mb-1">{product.name_en}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{product.region} Origin</p>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-6">
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Price</p>
                  <p className="font-black text-gray-900">ETB {product.price}.00</p>
               </div>
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Stock</p>
                  <p className={`font-black ${product.stock < 50 ? 'text-orange-500' : 'text-green-600'}`}>{product.stock} bags</p>
               </div>
            </div>

            {product.stock < 50 && (
              <div className="mt-4 p-3 bg-orange-50 rounded-xl flex items-center gap-2 text-orange-600 text-[10px] font-bold">
                 <AlertCircle size={14} /> Low stock alert! Time to roast more.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
