import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Search, Filter, 
  ChevronLeft, ChevronRight, MoreVertical,
  Image as ImageIcon, Coffee
} from 'lucide-react';
import { MOCK_COFFEE } from '../../constants';

const ProductManagement = () => {
  const [products, setProducts] = useState(MOCK_COFFEE);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const origins = ['All', 'Yirgacheffe', 'Sidamo', 'Harrar', 'Jimma', 'Guji'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.origin === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-500">Manage your coffee inventory and regional varieties.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#006341] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#004d32] transition flex items-center gap-2 w-fit"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#006341] text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {origins.map(o => (
            <button
              key={o}
              onClick={() => setFilter(o)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                filter === o ? 'bg-[#4B2C20] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-50">
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Origin</th>
                <th className="px-8 py-5">Roast</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Stock</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={product.imageUrl} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={product.name} />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: EB-{product.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-gray-600">{product.origin}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold uppercase">{product.roast}</span>
                  </td>
                  <td className="px-8 py-5 font-bold text-[#006341]">
                    {product.price} ETB
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold">124 kg</span>
                      <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[70%]" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      In Stock
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={16} /></button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400 font-bold uppercase">Showing {filteredProducts.length} of {products.length} Products</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-black disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-sm font-bold px-2">1</span>
            <button className="p-2 text-gray-400 hover:text-black"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
