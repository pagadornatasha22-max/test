import React, { useState } from 'react';
import { User, CartItem, Order } from '../../types';
import { CheckCircle2, QrCode, Calendar, Clock, CreditCard, User as UserIcon, Phone, Mail, FileText, ArrowLeft, HeartHandshake, ShieldCheck, Upload, AlertCircle, Sparkles } from 'lucide-react';
import { compressImage } from '../../utils/image';

interface CheckoutViewProps {
  currentUser: User;
  cart: CartItem[];
  onConfirmOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt'>) => Order;
  onBackToCart: () => void;
  onViewMyOrders: () => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  currentUser,
  cart,
  onConfirmOrder,
  onBackToCart,
  onViewMyOrders,
  addToast,
}) => {
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [contactNumber, setContactNumber] = useState(currentUser.contactNumber);
  const [email, setEmail] = useState(currentUser.email);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [optionalMessageCard, setOptionalMessageCard] = useState('');
  const [paymentMethod] = useState<'GCash'>('GCash');
  const [paymentReference, setPaymentReference] = useState('');
  const [gcashReceiptPhoto, setGcashReceiptPhoto] = useState<string>('');
  const [simulatedReceiptRef, setSimulatedReceiptRef] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, 600, 0.6)
        .then((compressedBase64) => {
          setGcashReceiptPhoto(compressedBase64);
          setValidationError('');
          
          const matches = file.name.match(/\d{6,}/);
          if (matches) {
            setSimulatedReceiptRef(matches[0]);
          } else if (!simulatedReceiptRef) {
            setSimulatedReceiptRef('998877665544');
          }
        })
        .catch((err) => {
          console.error("Compression error:", err);
          addToast('error', 'Failed to compress or upload image. Please try again.');
        });
    }
  };

  const handleGenerateValidReceipt = () => {
    if (!paymentReference || paymentReference.trim().length < 6) {
      addToast('error', 'Please type a Reference Number (at least 6 digits) first.');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0052fe'; // GCash Blue
      ctx.fillRect(0, 0, 400, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('GCash Send Money', 20, 50);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 80, 400, 420);
      
      ctx.fillStyle = '#111111';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText(`₱${subtotal.toLocaleString()}`, 20, 140);

      ctx.fillStyle = '#666666';
      ctx.font = '16px sans-serif';
      ctx.fillText('Sent to: MACEL CANIPAAN (0917 123 4567)', 20, 180);

      ctx.strokeStyle = '#dddddd';
      ctx.beginPath();
      ctx.moveTo(20, 220);
      ctx.lineTo(380, 220);
      ctx.stroke();

      ctx.fillStyle = '#0052fe';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(`Ref. No. ${paymentReference}`, 20, 270);

      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('✓ SUCCESSFUL TRANSACTION', 20, 320);

      const dataUrl = canvas.toDataURL('image/png');
      setGcashReceiptPhoto(dataUrl);
      setSimulatedReceiptRef(paymentReference);
      setValidationError('');
      addToast('success', `Generated valid GCash receipt for Ref No ${paymentReference}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupDate) {
      addToast('error', 'Please select a valid pickup date.');
      return;
    }

    if (paymentMethod === 'GCash') {
      if (!paymentReference || paymentReference.trim().length < 6) {
        addToast('error', 'Please enter a valid GCash Reference Number (at least 6 digits).');
        return;
      }
      if (!gcashReceiptPhoto) {
        setValidationError('Please upload your GCash payment receipt screenshot.');
        addToast('error', 'Please upload your GCash payment receipt screenshot.');
        return;
      }
    }

    const pickupDateTime = `${pickupDate}T${pickupTime}`;

    const newOrder = onConfirmOrder({
      customerId: currentUser.id,
      customerName: fullName,
      contactNumber,
      email,
      pickupDateTime,
      optionalMessageCard: optionalMessageCard.trim() || undefined,
      paymentMethod,
      paymentReference: paymentMethod === 'GCash' ? paymentReference.trim() : undefined,
      paymentReceiptPhoto: paymentMethod === 'GCash' ? gcashReceiptPhoto : undefined,
      items: cart,
      totalAmount: subtotal,
    });

    setConfirmedOrder(newOrder);
    addToast('success', `Order successfully placed! Order #${newOrder.orderNumber}`);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl shadow-2xl border border-emerald-100 p-8 sm:p-12 text-center space-y-6 animate-scale-up">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-50/50">
          <CheckCircle2 className="w-14 h-14" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Order Submitted
          </span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Thank You For Your Order!</h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            Your payment is now pending verification. Macel's Flower Shop will begin styling your fresh blooms once verified.
          </p>
        </div>

        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-left space-y-4 max-w-md mx-auto">
          <div className="flex justify-between items-center pb-3 border-b border-stone-200">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Order Reference:</span>
            <span className="text-xl font-serif font-black text-emerald-800">{confirmedOrder.orderNumber}</span>
          </div>

          <div className="space-y-1.5 text-xs text-stone-700">
            <p><strong className="text-stone-900">Customer Name:</strong> {confirmedOrder.customerName}</p>
            <p><strong className="text-stone-900">Pickup Schedule:</strong> {new Date(confirmedOrder.pickupDateTime).toLocaleString()}</p>
            <p><strong className="text-stone-900">Payment Status:</strong> Pending Verification</p>
            <p><strong className="text-stone-900">Total Paid/Due:</strong> ₱{confirmedOrder.totalAmount.toLocaleString()}</p>
          </div>

          <div className="pt-2">
            <p className="text-[11px] text-stone-500 italic bg-white p-2.5 rounded-lg border border-stone-205">
              📍 Canipaan, Hinunangan, Southern Leyte (GPS: 10.414779, 125.185361)
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onViewMyOrders}
            className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
          >
            Track Order Status in My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-fade-in-up">
      
      {/* Back button and title */}
      <div className="flex items-center space-x-4 pb-4 border-b border-stone-200">
        <button
          onClick={onBackToCart}
          className="p-2.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Secure Checkout</h2>
          <p className="text-xs text-stone-500 mt-1">Complete your order details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-emerald-700" />
              <span>Customer Details</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-emerald-750"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-emerald-750"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Pickup Schedule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-emerald-750"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 flex items-center justify-between">
                  <span>Pickup Time *</span>
                  <span className="text-[10px] text-stone-400 font-normal">Shop: 8 AM - 6 PM</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <input
                    type="time"
                    required
                    min="08:00"
                    max="18:00"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-emerald-750"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center space-x-2">
              <span>📍 Address for Pickup: Macel's Flower Shop, Canipaan, Hinunangan, Southern Leyte.</span>
            </p>
          </div>

          {/* Optional Message Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-3">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>Dedication Card Message (Optional)</span>
            </h3>
            <p className="text-xs text-stone-500">
              We will print or handwrite your note on a premium card attached to the flowers.
            </p>
            <textarea
              rows={3}
              value={optionalMessageCard}
              onChange={(e) => setOptionalMessageCard(e.target.value)}
              placeholder="e.g., Happy anniversary, thank you for being you!..."
              className="w-full p-4 border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-750"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              <span>Exclusive Online Payment Channel</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50/40 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">✓</span>
                    <span className="font-bold text-blue-950 text-sm">GCash Online Transfer (Verified)</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold tracking-wide uppercase">
                    Secured Channel
                  </span>
                </div>
                <p className="text-xs text-stone-600 pl-6">
                  Macel's Flower Shop exclusively accepts GCash online transfer to guarantee fresh bloom allocation.
                </p>
              </div>
            </div>

            {/* GCash Simulator UI */}
            {paymentMethod === 'GCash' && (
              <div className="mt-4 p-6 bg-emerald-950 text-white space-y-4 animate-slide-up shadow-lg rounded-2xl border border-emerald-800">
                <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-black text-sm">
                      G
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">GCash Secure Payment Channel</h4>
                      <p className="text-[11px] text-stone-400">Verified account</p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-400 font-bold bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800">
                    Scan or Send
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="bg-white p-4 rounded-xl text-center text-stone-900 max-w-[180px] mx-auto sm:mx-0">
                    <div className="w-full aspect-square bg-stone-100 flex items-center justify-center border border-stone-350 rounded-lg p-2">
                      <QrCode className="w-28 h-28 text-stone-900" />
                    </div>
                    <p className="text-[10px] font-extrabold text-stone-600 mt-2 tracking-widest uppercase">
                      Scan to Pay
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs space-y-1 bg-emerald-900/60 p-3 rounded-xl border border-emerald-900">
                      <p className="text-stone-400">Recipient Name:</p>
                      <p className="text-sm font-bold text-gold-400">MACEL CANIPAAN</p>
                      <p className="text-stone-400 pt-1">GCash Mobile No:</p>
                      <p className="text-sm font-bold text-white tracking-wider">0917 123 4567</p>
                      <p className="text-stone-400 pt-1">Amount Due:</p>
                      <p className="text-base font-serif font-extrabold text-gold-400">₱{subtotal.toLocaleString()}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Enter GCash Reference Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentReference}
                        onChange={(e) => {
                          setPaymentReference(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        placeholder="e.g. 701928374921"
                        className="w-full px-3 py-2.5 bg-emerald-900/40 border border-emerald-900 rounded-xl text-white placeholder-stone-500 font-mono text-sm focus:ring-2 focus:ring-emerald-600"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">Found in your GCash SMS confirmation.</p>
                    </div>
                  </div>
                </div>

                {/* GCash Receipt Image Upload Section */}
                <div className="pt-4 border-t border-emerald-900 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-350 mb-1">
                      Upload GCash Payment Screenshot / Receipt *
                    </label>
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 rounded-xl font-bold text-xs text-white cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>Choose Receipt Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleGenerateValidReceipt}
                        className="flex items-center space-x-1.5 px-3 py-2.5 bg-emerald-900/50 hover:bg-emerald-900 border border-emerald-800 rounded-xl font-semibold text-xs text-gold-400 transition-colors cursor-pointer"
                        title="Simulate a receipt image that exactly matches your typed reference number"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                        <span>Auto-Generate Valid Receipt</span>
                      </button>
                    </div>
                  </div>

                  {gcashReceiptPhoto && (
                    <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/80 flex flex-col sm:flex-row items-center gap-4">
                      <img
                        src={gcashReceiptPhoto}
                        alt="GCash Receipt Preview"
                        className="w-20 h-28 object-contain bg-stone-900 rounded-lg border border-stone-800 shrink-0"
                      />
                      <div className="space-y-1 text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-850 uppercase tracking-wider">
                          Receipt Uploaded
                        </span>
                        <p className="text-stone-300">
                          Detected/Embedded Ref: <code className="text-white font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded">{simulatedReceiptRef || 'Scanning...'}</code>
                        </p>
                        <p className="text-[11px] text-stone-400">
                          Order will proceed as "Pending" while admin verifies the uploaded screenshot manually.
                        </p>
                      </div>
                    </div>
                  )}

                  {validationError && (
                    <div className="p-3.5 bg-rose-950/80 border border-rose-800 rounded-xl flex items-center space-x-3 text-rose-300 text-xs animate-shake">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <span className="font-bold">{validationError}</span>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Right 1 Col: Summary & Confirm */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-900/5 space-y-6 sticky top-28">
            <h3 className="font-serif font-bold text-xl text-stone-900 pb-3 border-b border-stone-100">
              Order Summary
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-none">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start justify-between text-xs space-x-2 pb-2 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="font-bold text-stone-900">{item.product.name}</p>
                    <p className="text-stone-500">Qty: {item.quantity} × ₱{item.product.price.toLocaleString()}</p>
                  </div>
                  <span className="font-serif font-bold text-emerald-800 shrink-0">₱{item.itemTotal.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Stylist Prep Fee</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="pt-3 border-t border-dashed border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-base">Total Amount:</span>
                <span className="text-3xl font-serif font-black text-emerald-800">₱{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>Confirm & Place Order</span>
            </button>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-[11px] text-stone-500">
              <div className="flex items-center space-x-1.5 text-stone-850 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verification Workflow</span>
              </div>
              <p>
                Aiven DB records this order as "Pending Verification". Admin reviews the receipt for confirmation.
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
