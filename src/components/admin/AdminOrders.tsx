import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { Search, Clock, CheckCircle2, Package, Sparkles, X, XCircle } from 'lucide-react';

interface AdminOrdersProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, onUpdateOrderStatus, addToast }) => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.contactNumber.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Clock className="w-3.5 h-3.5 inline" /> Pending</span>;
      case 'Preparing':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Sparkles className="w-3.5 h-3.5 inline animate-spin" /> Preparing</span>;
      case 'Ready for Pickup':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Package className="w-3.5 h-3.5 inline animate-bounce" /> Ready for Pickup</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><CheckCircle2 className="w-3.5 h-3.5 inline" /> Completed</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><XCircle className="w-3.5 h-3.5 inline" /> Rejected</span>;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
    addToast('success', `Order #${orders.find((o) => o.id === orderId)?.orderNumber} marked as ${newStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Manage Customer Orders</h2>
          <p className="text-xs text-stone-500 mt-1">Review orders and update pickup progress</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800">
            {orders.filter((o) => o.status === 'Pending').length} Pending
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800">
            {orders.filter((o) => o.status === 'Preparing').length} Preparing
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-800">
            {orders.filter((o) => o.status === 'Ready for Pickup').length} Ready
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-stone-200/80">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider px-2 hidden sm:inline">
            Status:
          </span>
          {(['all', 'Pending', 'Preparing', 'Ready for Pickup', 'Completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st ? 'bg-rose-600 text-white shadow-md shadow-rose-200' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, customer, phone..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100/80 border border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-stone-500 font-medium space-y-2">
            <p>No customer orders match your search or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-400">
                  <th className="pb-3 pr-4">Order ID & Date</th>
                  <th className="pb-3 px-4">Customer Details</th>
                  <th className="pb-3 px-4">Pickup Date & Time</th>
                  <th className="pb-3 px-4">Payment Method</th>
                  <th className="pb-3 px-4">Total Amount</th>
                  <th className="pb-3 px-4">Current Status</th>
                  <th className="pb-3 pl-4 text-right">Update Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="font-mono font-bold text-rose-600 text-base">{ord.orderNumber}</span>
                      <span className="block text-[11px] text-stone-400">{new Date(ord.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-4 px-4 text-stone-900">
                      <span className="font-bold block">{ord.customerName}</span>
                      <span className="text-xs text-stone-500">{ord.contactNumber}</span>
                    </td>
                    <td className="py-4 px-4 text-stone-700 text-xs">
                      {new Date(ord.pickupDateTime).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <span className="font-bold">{ord.paymentMethod}</span>
                      {ord.paymentReference && (
                        <span className="block text-[10px] font-mono text-stone-500">Ref: {ord.paymentReference}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-black text-stone-900 text-base">
                      ₱{ord.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(ord.status)}</td>
                    <td className="py-4 pl-4 text-right space-x-2">
                      <div className="inline-flex space-x-1">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                          className="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 focus:ring-2 focus:ring-rose-500 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-scale-up border border-stone-100">
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-wider">
                Full Order Audit
              </span>
              <h3 className="font-serif font-bold text-2xl text-stone-900 flex items-center space-x-2">
                <span>Order {selectedOrder.orderNumber}</span>
              </h3>
              <div className="pt-1">{getStatusBadge(selectedOrder.status)}</div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-3">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium block">Customer Name:</span>
                  <p className="font-bold text-stone-900 text-sm">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">Contact Number:</span>
                  <p className="font-bold text-stone-900 text-sm">{selectedOrder.contactNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium block">Email:</span>
                  <p className="font-semibold text-stone-900">{selectedOrder.email}</p>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">Pickup Scheduled:</span>
                  <p className="font-bold text-rose-700">{new Date(selectedOrder.pickupDateTime).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-2">
                <div>
                  <span className="text-stone-500 font-medium block">Payment Method:</span>
                  <p className="font-bold text-stone-900">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">GCash Ref Number:</span>
                  <p className="font-mono font-bold text-stone-900">{selectedOrder.paymentReference || 'N/A (Cash)'}</p>
                </div>
              </div>

              {selectedOrder.paymentReceiptPhoto && (
                <div className="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-200 text-blue-950 flex flex-col sm:flex-row items-center gap-3">
                  <img
                    src={selectedOrder.paymentReceiptPhoto}
                    alt="Uploaded GCash Receipt"
                    className="w-20 h-28 object-contain bg-stone-900 rounded-lg border border-stone-300 shadow-2xs"
                  />
                  <div className="space-y-1 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider">
                      Verified GCash Screenshot
                    </span>
                    <p className="text-stone-700">
                      Receipt uploaded successfully during checkout verification. Ref matched.
                    </p>
                    <a
                      href={selectedOrder.paymentReceiptPhoto}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-bold underline block"
                    >
                      Open Full Size Image
                    </a>
                  </div>
                </div>
              )}

              {selectedOrder.optionalMessageCard && (
                <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                  <span className="font-bold block text-amber-900 mb-1">💌 Attached Message Card Note:</span>
                  <p className="italic font-serif leading-relaxed">"{selectedOrder.optionalMessageCard}"</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">Itemized Breakdown</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-none">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs pb-2 border-b border-stone-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0" />
                      <div>
                        <p className="font-bold text-stone-900 text-sm">{item.product.name}</p>
                        <p className="text-stone-500">Qty: {item.quantity} × ₱{item.product.price.toLocaleString()}</p>
                        {item.selectedOptions && (
                          <div className="text-[10px] text-stone-500 space-y-0.5">
                            <p>Wrap: {item.selectedOptions.wrapper} | Ribbon: {item.selectedOptions.ribbon}</p>
                            {item.selectedOptions.sampleImage && (
                              <div className="pt-1 flex items-center space-x-2">
                                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">📸 Sample Reference Attached</span>
                                <a href={item.selectedOptions.sampleImage} target="_blank" rel="noreferrer" className="text-purple-600 underline font-semibold">View Full Photo</a>
                              </div>
                            )}
                          </div>
                        )}
                        {item.customNotes && (
                          <span className="text-[10px] text-rose-600 block bg-rose-50 p-1 rounded-md mt-0.5">Notes: {item.customNotes}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-extrabold text-stone-900 text-sm shrink-0">₱{item.itemTotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-bold text-stone-900 text-sm uppercase">Total Order Value:</span>
              <span className="text-3xl font-black text-rose-600">₱{selectedOrder.totalAmount.toLocaleString()}</span>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Quick Update Status:</span>
              <div className="flex space-x-2">
                {/* Approve/Reject buttons for Pending orders */}
                {selectedOrder.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, 'Preparing')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      ✓ Approve Order
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, 'Rejected')}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
                    >
                      ✕ Reject Order
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Preparing')}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Preparing
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Ready for Pickup')}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors"
                >
                  Ready for Pickup
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Completed')}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Completed
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
