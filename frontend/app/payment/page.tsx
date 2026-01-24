"use client";

import { useState } from "react";
import { FaCreditCard, FaPaypal, FaLock } from "react-icons/fa";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(1500);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    try {
        const res = await fetch("http://localhost:8000/payment/process", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: amount,
                currency: "MAD",
                method: "card",
                user_id: 1 // Mock user ID
            })
        });
        
        if (res.ok) {
            setSuccess(true);
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
          <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
              <div className="bg-white p-8 rounded-lg shadow text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="mt-2 text-xl font-medium text-gray-900">Payment Successful!</h3>
                  <p className="mt-2 text-gray-500">Your mock transaction was processed successfully.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:text-sm">
                      Make Another Payment
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-slate-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaLock className="text-emerald-400" /> Secure Payment
            </h2>
        </div>
        <div className="p-6">
            <p className="text-sm text-gray-500 mb-6">Complete your booking with our secure payment gateway.</p>
            
            <form onSubmit={handlePayment} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Amount (MAD)</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 border-2 border-emerald-500 bg-emerald-50 text-emerald-700 p-3 rounded-lg font-medium">
                        <FaCreditCard /> Card
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 p-3 rounded-lg font-medium hover:bg-gray-50">
                        <FaPaypal /> PayPal
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-gray-700">Expiry</label>
                             <input type="text" placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700">CVC</label>
                             <input type="text" placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                >
                    {loading ? "Processing..." : `Pay ${amount} MAD`}
                </button>
            </form>
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-center gap-4 text-gray-400 text-2xl">
            <FaCreditCard />
            <FaPaypal />
            <FaLock />
        </div>
      </div>
    </div>
  );
}
