'use client';

import React, { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  X,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const BookingModal = ({ packageData, onClose, onSuccess }) => {
  const { user } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Selection, 2: Summary & Customer, 3: Payment, 4: Confirmation
  const [travelDate, setTravelDate] = useState(
    packageData.startDate ? new Date(packageData.startDate).toISOString().split('T')[0] : ''
  );
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [completedBooking, setCompletedBooking] = useState(null);

  const totalAmount = packageData.price * numberOfPeople;

  // Step 1 -> 2: Validate seats & user login
  const handleProceedToSummary = () => {
    if (!user) {
      window.location.href = '/login?redirect=/packages/' + packageData.id;
      return;
    }
    if (numberOfPeople < 1 || numberOfPeople > packageData.availableSeats) {
      setError(`Please select between 1 and ${packageData.availableSeats} travelers.`);
      return;
    }
    setError(null);
    setStep(2);
  };

  // Step 2 -> 3: Initiate booking via API
  const handleCreateBooking = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/bookings', {
        packageId: packageData.id,
        travelDate,
        numberOfPeople
      });

      if (response.data.success) {
        setCompletedBooking(response.data.booking);
        setStep(3);
      } else {
        setError(response.data.message || 'Failed to initiate booking.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3 -> 4: Process Mock Payment
  const handleProcessPayment = async () => {
    if (!completedBooking) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/payments', {
        bookingId: completedBooking.id,
        paymentMethod,
        transactionId: `TXN_${completedBooking.bookingId}_${Math.floor(100000 + Math.random() * 900000)}`
      });

      if (response.data.success) {
        setCompletedBooking(response.data.booking);
        setStep(4);
        if (onSuccess) onSuccess(response.data.booking);
      } else {
        setError(response.data.message || 'Payment processing failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Book Package</h3>
            <p className="text-xs text-slate-400 mt-0.5">{packageData.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className={step >= 1 ? 'text-emerald-600 font-bold' : ''}>1. Select Travelers</span>
          <span>&rarr;</span>
          <span className={step >= 2 ? 'text-emerald-600 font-bold' : ''}>2. Summary</span>
          <span>&rarr;</span>
          <span className={step >= 3 ? 'text-emerald-600 font-bold' : ''}>3. Payment</span>
          <span>&rarr;</span>
          <span className={step >= 4 ? 'text-emerald-600 font-bold' : ''}>4. Confirmed</span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Date & Travelers Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Select Travel Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center space-x-1">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Number of People (Seats Available: {packageData.availableSeats})</span>
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-900 text-xl border border-slate-300"
                  >
                    -
                  </button>
                  <span className="text-2xl font-extrabold text-slate-900 w-12 text-center">
                    {numberOfPeople}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNumberOfPeople(Math.min(packageData.availableSeats, numberOfPeople + 1))}
                    className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-900 text-xl border border-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Price Calculation</span>
                  <span className="text-sm font-semibold text-slate-700">
                    ₹{packageData.price} × {numberOfPeople} person(s)
                  </span>
                </div>
                <span className="text-2xl font-extrabold text-emerald-700">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleProceedToSummary}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition-all"
              >
                Proceed to Booking Summary
              </button>
            </div>
          )}

          {/* STEP 2: Customer Details & Booking Summary */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-sm">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Customer Profile</h4>
                <p><span className="text-slate-500">Name:</span> <strong>{user?.name}</strong></p>
                <p><span className="text-slate-500">Email:</span> <strong>{user?.email}</strong></p>
                <p><span className="text-slate-500">Mobile:</span> <strong>{user?.mobile}</strong></p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-sm">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Tour Summary</h4>
                <p><span className="text-slate-500">Package:</span> <strong>{packageData.name}</strong></p>
                <p><span className="text-slate-500">Destination:</span> <strong>{packageData.destination}</strong></p>
                <p><span className="text-slate-500">Travel Date:</span> <strong>{new Date(travelDate).toDateString()}</strong></p>
                <p><span className="text-slate-500">Travelers:</span> <strong>{numberOfPeople} Person(s)</strong></p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-emerald-700">
                  <span>Total Amount Payable:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateBooking}
                  disabled={loading}
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating Booking...' : 'Confirm & Proceed to Pay'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Flow */}
          {step === 3 && completedBooking && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                <p className="font-bold text-base">Booking Reference: {completedBooking.bookingId}</p>
                <p className="text-xs mt-1">Please select payment method to complete payment.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                  Select Payment Gateway Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['UPI', 'CREDIT_CARD', 'NET_BANKING'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-xl border text-center font-bold text-xs transition-all ${
                        paymentMethod === method
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-md'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {method.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <QrCode className="w-24 h-24 text-slate-800 mx-auto" />
                  <p className="text-xs text-slate-500 mt-2 font-mono">akole-tourism@upi</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Scan or click button below to simulate instant UPI approval.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleProcessPayment}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{loading ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString()} Now`}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Booking Confirmation Screen */}
          {step === 4 && completedBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Booking Confirmed!</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Thank you for booking with Akole Tourism. Your reservation is locked!
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500 font-bold uppercase">Booking ID</span>
                  <span className="font-extrabold text-emerald-700 text-lg">{completedBooking.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Package Name:</span>
                  <span className="font-bold text-slate-900">{packageData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Date:</span>
                  <span className="font-bold text-slate-900">{new Date(travelDate).toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travelers:</span>
                  <span className="font-bold text-slate-900">{completedBooking.numberOfPeople} Person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Paid:</span>
                  <span className="font-bold text-slate-900">₹{completedBooking.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                    {completedBooking.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-1/2 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-1/2 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-md"
                >
                  Go to My Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
