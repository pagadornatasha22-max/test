import React, { useState } from 'react';
import { Product, SelectedOptions } from '../../types';
import { CUSTOMIZER_OPTIONS, INITIAL_PRODUCTS } from '../../data/mockData';
import { Sparkles, ShoppingBag, Zap, CheckCircle2, ChevronRight, Gift, Upload, X } from 'lucide-react';
import { compressImage } from '../../utils/image';

interface CustomizerToolProps {
  onAddToCart: (product: Product, quantity: number, customNotes?: string, selectedOptions?: SelectedOptions) => void;
  onDirectCheckout: (product: Product, selectedOptions?: SelectedOptions) => void;
}

export const CustomizerTool: React.FC<CustomizerToolProps> = ({ onAddToCart, onDirectCheckout }) => {
  const [selectedFlowerIndex, setSelectedFlowerIndex] = useState<number>(0);
  const [selectedWrapperIndex, setSelectedWrapperIndex] = useState<number>(0);
  const [selectedRibbonIndex, setSelectedRibbonIndex] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [sampleImage, setSampleImage] = useState<string>('');

  const currentFlower = CUSTOMIZER_OPTIONS.flowers[selectedFlowerIndex];
  const currentWrapper = CUSTOMIZER_OPTIONS.wrappers[selectedWrapperIndex];
  const currentRibbon = CUSTOMIZER_OPTIONS.ribbons[selectedRibbonIndex];

  const addOnsTotal = selectedAddOns.reduce((sum, idx) => sum + CUSTOMIZER_OPTIONS.addOns[idx].price, 0);
  const calculatedTotal = currentFlower.price + currentWrapper.price + currentRibbon.price + addOnsTotal;

  const toggleAddOn = (index: number) => {
    if (selectedAddOns.includes(index)) {
      setSelectedAddOns(selectedAddOns.filter((i) => i !== index));
    } else {
      setSelectedAddOns([...selectedAddOns, index]);
    }
  };

  const handleSampleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, 600, 0.6)
        .then((compressedBase64) => {
          setSampleImage(compressedBase64);
        })
        .catch((err) => {
          console.error("Compression error:", err);
        });
    }
  };

  const getCustomProductPayload = (): { product: Product; options: SelectedOptions } => {
    const addOnNames = selectedAddOns.map((idx) => CUSTOMIZER_OPTIONS.addOns[idx].name);
    
    const customizedProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Custom Arrangement (${currentFlower.name.split(' ')[0]}...)`,
      category: 'customized',
      price: calculatedTotal,
      image: sampleImage || INITIAL_PRODUCTS.find((p) => p.category === 'customized')?.image || 'https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=800',
      description: `Bespoke arrangement: ${currentFlower.name} with ${currentWrapper.name}, tied with ${currentRibbon.name}. ${addOnNames.length > 0 ? `Add-ons: ${addOnNames.join(', ')}.` : ''}${sampleImage ? ' (Customer attached a reference sample image)' : ''}`,
      rating: 5.0,
      isAvailable: true,
    };

    const options: SelectedOptions = {
      flower: currentFlower.name,
      wrapper: currentWrapper.name,
      ribbon: currentRibbon.name,
      addOns: addOnNames,
      sampleImage: sampleImage || undefined,
    };

    return { product: customizedProduct, options };
  };

  const handleAdd = () => {
    const { product, options } = getCustomProductPayload();
    onAddToCart(product, 1, specialInstructions, options);
  };

  const handleBuy = () => {
    const { product, options } = getCustomProductPayload();
    product.description += specialInstructions ? ` [Notes: ${specialInstructions}]` : '';
    onDirectCheckout(product, options);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-fade-in-up">
      {/* Luxury Title Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-8 sm:p-12 shadow-xl overflow-hidden border border-emerald-700/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(195,156,89,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-gold-400 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Interactive Floral Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Design Your Own <span className="text-gold-400 italic font-normal">Custom Bouquet</span>
            </h2>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              Curate your favorite elements from base flowers to premium wraps and satin ribbons. Create a botanic masterpiece uniquely yours.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center min-w-[240px] shrink-0 shadow-lg">
            <p className="text-xs uppercase tracking-wider text-stone-300 font-bold mb-1">Arrangement Total</p>
            <p className="text-4xl font-serif font-bold text-gold-400">₱{calculatedTotal.toLocaleString()}</p>
            <p className="text-[10px] text-stone-400 mt-2">Includes stylist design & fresh wrapping</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Selections Column (Takes 2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Main Flowers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-100">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif font-bold text-sm">I</span>
              <h3 className="font-serif font-bold text-lg text-stone-900">Choose Flower Base & Style</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CUSTOMIZER_OPTIONS.flowers.map((fl, idx) => (
                <div
                  key={fl.name}
                  onClick={() => setSelectedFlowerIndex(idx)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedFlowerIndex === idx
                      ? 'border-emerald-700 bg-emerald-50/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <p className={`font-bold text-sm ${selectedFlowerIndex === idx ? 'text-emerald-950' : 'text-stone-850'}`}>
                      {fl.name}
                    </p>
                    <p className="text-xs font-semibold text-emerald-700">+₱{fl.price}</p>
                  </div>
                  {selectedFlowerIndex === idx && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Wrapper */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-100">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif font-bold text-sm">II</span>
              <h3 className="font-serif font-bold text-lg text-stone-900">Select Wrap Option</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CUSTOMIZER_OPTIONS.wrappers.map((wp, idx) => (
                <div
                  key={wp.name}
                  onClick={() => setSelectedWrapperIndex(idx)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedWrapperIndex === idx
                      ? 'border-emerald-700 bg-emerald-50/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <p className={`font-bold text-sm ${selectedWrapperIndex === idx ? 'text-emerald-950' : 'text-stone-850'}`}>
                      {wp.name}
                    </p>
                    <p className="text-xs font-semibold text-emerald-700">+₱{wp.price}</p>
                  </div>
                  {selectedWrapperIndex === idx && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Ribbon */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-100">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif font-bold text-sm">III</span>
              <h3 className="font-serif font-bold text-lg text-stone-900">Select Satin Ribbon Bow</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CUSTOMIZER_OPTIONS.ribbons.map((rb, idx) => (
                <div
                  key={rb.name}
                  onClick={() => setSelectedRibbonIndex(idx)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedRibbonIndex === idx
                      ? 'border-emerald-700 bg-emerald-50/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <p className={`font-bold text-sm ${selectedRibbonIndex === idx ? 'text-emerald-950' : 'text-stone-850'}`}>
                      {rb.name}
                    </p>
                    <p className="text-xs font-semibold text-emerald-700">+₱{rb.price}</p>
                  </div>
                  {selectedRibbonIndex === idx && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Optional Add-ons */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-100">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif font-bold text-sm">IV</span>
              <h3 className="font-serif font-bold text-lg text-stone-900">Sweet Gifts & Cards (Optional)</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CUSTOMIZER_OPTIONS.addOns.map((ao, idx) => {
                const isSelected = selectedAddOns.includes(idx);
                return (
                  <div
                    key={ao.name}
                    onClick={() => toggleAddOn(idx)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-gold-500 bg-gold-50/30 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className={`font-bold text-sm ${isSelected ? 'text-gold-950' : 'text-stone-850'}`}>
                        {ao.name}
                      </p>
                      <p className="text-xs font-semibold text-gold-700">+₱{ao.price}</p>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0" />
                    ) : (
                      <Gift className="w-5 h-5 text-stone-300 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-3">
            <label className="block font-serif font-bold text-lg text-stone-900">
              Stylist Design Notes
            </label>
            <textarea
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Shorten the flower stems, insert a customized tag card, or style to look compact..."
              className="w-full p-4 border border-stone-300 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-stone-50/50"
            />
          </div>

          {/* 5. Sample Reference Photo Upload */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-100">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif font-bold text-sm">V</span>
              <h3 className="font-serif font-bold text-lg text-stone-900">Upload Reference Image (Optional)</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Have a custom Pinterest reference screenshot? Upload it here so Macel's Flower Shop can mimic the style.
            </p>
            
            <div className="flex items-center space-x-4 pt-1">
              <label className="flex items-center space-x-2 px-5 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl font-bold text-sm cursor-pointer transition-all border border-emerald-200/80 shadow-2xs">
                <Upload className="w-4 h-4" />
                <span>Upload Reference Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSampleUpload}
                  className="hidden"
                />
              </label>

              {sampleImage && (
                <button
                  type="button"
                  onClick={() => setSampleImage('')}
                  className="flex items-center space-x-1 text-xs font-bold text-stone-400 hover:text-rose-600 transition-colors p-2"
                >
                  <X className="w-4 h-4" />
                  <span>Remove Attachment</span>
                </button>
              )}
            </div>

            {sampleImage && (
              <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 inline-block">
                <p className="text-xs font-bold text-stone-700 mb-2">Attached Preview:</p>
                <img
                  src={sampleImage}
                  alt="Reference Preview"
                  className="w-36 h-36 object-cover rounded-xl border border-stone-300 shadow-xs"
                />
              </div>
            )}
          </div>

        </div>

        {/* Live Preview Summary Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-900/5 sticky top-28 space-y-6">
            <div className="pb-4 border-b border-stone-100">
              <h3 className="font-serif font-bold text-xl text-stone-900">Your Masterpiece</h3>
              <p className="text-xs text-stone-500 mt-1">Freshly Handcrafted & Curated</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-stone-850">Base Flower</p>
                  <p className="text-xs text-stone-550">{currentFlower.name}</p>
                </div>
                <span className="font-semibold text-stone-950">₱{currentFlower.price}</span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-stone-850">Wrapper Wrap</p>
                  <p className="text-xs text-stone-550">{currentWrapper.name}</p>
                </div>
                <span className="font-semibold text-stone-950">₱{currentWrapper.price}</span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-stone-850">Satin Ribbon Accent</p>
                  <p className="text-xs text-stone-550">{currentRibbon.name}</p>
                </div>
                <span className="font-semibold text-stone-950">₱{currentRibbon.price}</span>
              </div>

              {selectedAddOns.length > 0 && (
                <div className="pt-2 border-t border-dashed border-stone-200 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Add-ons</p>
                  {selectedAddOns.map((idx) => {
                    const item = CUSTOMIZER_OPTIONS.addOns[idx];
                    return (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <span className="text-stone-600">🎁 {item.name}</span>
                        <span className="font-semibold text-stone-950">₱{item.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {specialInstructions && (
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 border border-stone-200">
                  <span className="font-bold text-stone-800">Instructions: </span>
                  {specialInstructions}
                </div>
              )}

              {sampleImage && (
                <div className="p-3 bg-emerald-50/80 rounded-xl text-xs text-emerald-900 border border-emerald-250 flex items-center space-x-2">
                  <img src={sampleImage} alt="" className="w-10 h-10 object-cover rounded-lg border border-emerald-300 shrink-0" />
                  <div>
                    <span className="font-bold block text-emerald-950">📸 Reference Uploaded</span>
                    <span className="text-[11px] text-emerald-700">Matched during styling</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
              <span className="font-bold text-stone-850 text-base">Subtotal:</span>
              <span className="text-3xl font-serif font-black text-emerald-800">₱{calculatedTotal.toLocaleString()}</span>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer border border-emerald-100"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Arrangement to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuy}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all shadow-md shadow-emerald-700/10 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-gold-400" />
                <span>Buy Custom Bouquet Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
