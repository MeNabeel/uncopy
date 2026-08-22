'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

export default function EmiCalculator() {
  const [amount, setAmount] = useState<number>(25000);
  const [rate, setRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(3);

  const calculateEmi = () => {
    const monthlyRate = rate / 12 / 100;
    const months = tenureYears * 12;
    if (monthlyRate === 0) return amount / months;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emi = calculateEmi();
  const totalPayment = emi * tenureYears * 12;
  const totalInterest = Math.max(0, totalPayment - amount);

  return (
    <div className="my-6 sm:my-8 rounded-2xl glass-card p-4 sm:p-6 border border-emerald-500/20 shadow-xl bg-slate-900/80">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 m-0">Interactive Loan EMI Calculator</h3>
          <p className="text-xs text-slate-400 m-0">Estimate monthly payments and total interest payable instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4 sm:space-y-5">
          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-400" /> Loan Amount</span>
              <span className="text-emerald-400 font-mono text-sm sm:text-base">${amount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>$1,000</span>
              <span>$100,000</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-1.5"><Percent className="w-4 h-4 text-teal-400" /> Annual Interest Rate</span>
              <span className="text-teal-400 font-mono text-sm sm:text-base">{rate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-cyan-400" /> Loan Tenure</span>
              <span className="text-cyan-400 font-mono text-sm sm:text-base">{tenureYears} Yrs ({tenureYears * 12} Mos)</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>1 Year</span>
              <span>10 Years</span>
            </div>
          </div>
        </div>

        {/* Calculation Output Box */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
          <div className="text-center py-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">Monthly EMI Payment</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono my-2">${emi.toLocaleString()}</div>
            <span className="text-[11px] sm:text-xs text-slate-500">Principal + Interest per month</span>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-slate-800/80 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Principal Amount:</span>
              <span className="font-mono font-medium text-slate-200">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Interest Payable:</span>
              <span className="font-mono font-medium text-amber-400">${totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-slate-800">
              <span className="text-slate-200">Total Amount Payable:</span>
              <span className="font-mono text-emerald-400">${totalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
