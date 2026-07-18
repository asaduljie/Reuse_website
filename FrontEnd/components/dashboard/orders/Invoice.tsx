"use client";

import { FaLeaf } from "react-icons/fa";

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface InvoiceProps {
    orderNumber: number;
    customer: string;
    phone: string;
    address: string;
    date: string;
    items: OrderItem[];
    total: number;
}

export default function Invoice({
    orderNumber,
    customer,
    phone,
    address,
    date,
    items,
    total,
}: InvoiceProps) {
    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    /* Hide sidebar, topbar header, and any other print-hidden element */
                    aside, header, .print\\:hidden, [class*="print:hidden"] {
                        display: none !important;
                    }
                    /* Reset main container spacing and background */
                    body, html {
                        background-color: #ffffff !important;
                        background: #ffffff !important;
                    }
                    /* Reset flex min-h-screen layout container */
                    div.flex.min-h-screen {
                        display: block !important;
                        min-height: 0 !important;
                        background: transparent !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    main {
                        margin-left: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
                    /* Ensure print area is formatted nicely */
                    #invoice-print-area {
                        display: block !important;
                        width: 100% !important;
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    /* Clean up shadows/borders for print readability */
                    #invoice {
                        box-shadow: none !important;
                        border: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        max-width: 100% !important;
                    }
                }
            `}} />

            {/* Print wrapper */}
            <div id="invoice-print-area" className="w-full">
                <div id="invoice" className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden max-w-4xl mx-auto">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#145A3B] to-[#2e8b57]" />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#145A3B] to-[#2ecc71] flex items-center justify-center text-white shadow-sm">
                                <FaLeaf className="text-lg rotate-[-15deg]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-slate-800">
                                    Re<span className="text-[#145A3B]">Use</span>
                                </h1>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                    Sustainable preloved marketplace
                                </p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Commercial Invoice</h2>
                            <p className="text-xl font-extrabold text-slate-800 mt-1">#{orderNumber}</p>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 text-sm">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Billed To (Pelanggan)</h3>
                            <div className="text-slate-700 space-y-1">
                                <p className="font-extrabold text-base text-slate-800">{customer}</p>
                                <p className="font-medium text-slate-500">{phone}</p>
                                <p className="font-medium text-slate-600 leading-relaxed max-w-xs">{address}</p>
                            </div>
                        </div>
                        <div className="space-y-3 sm:text-right flex flex-col sm:items-end">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice Details</h3>
                            <div className="text-slate-700 space-y-1 sm:text-right">
                                <p className="font-semibold text-slate-600">
                                    <span className="text-slate-400 font-bold mr-1">Date:</span> {date}
                                </p>
                                <p className="font-semibold text-slate-600">
                                    <span className="text-slate-400 font-bold mr-1">Metode:</span> Transfer Bank / WA
                                </p>
                                <span className="inline-block bg-emerald-50 text-[#145A3B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100 mt-1">
                                    Paid
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mt-4 overflow-hidden border border-slate-100 rounded-2xl">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-bold">
                                    <th className="py-4 px-6">Product</th>
                                    <th className="py-4 px-4 text-center">Qty</th>
                                    <th className="py-4 px-4 text-right">Price</th>
                                    <th className="py-4 px-6 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-50 text-slate-700 hover:bg-slate-50/50 transition">
                                        <td className="py-4 px-6 font-semibold text-slate-800">{item.name}</td>
                                        <td className="py-4 px-4 text-center font-medium text-slate-500">{item.quantity}</td>
                                        <td className="py-4 px-4 text-right font-medium text-slate-500">
                                            Rp {item.price.toLocaleString("id-ID")}
                                        </td>
                                        <td className="py-4 px-6 text-right font-bold text-slate-800">
                                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Section */}
                    <div className="mt-8 flex justify-end">
                        <div className="w-full sm:w-72 bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <span>Subtotal</span>
                                <span className="text-slate-700">Rp {total.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <span>Pajak (0%)</span>
                                <span className="text-slate-700">Rp 0</span>
                            </div>
                            <div className="border-t border-slate-200/60 my-2 pt-2 flex justify-between items-center">
                                <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Total</span>
                                <span className="text-lg font-black text-[#145A3B]">
                                    Rp {total.toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Thank You Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-100 text-center space-y-2">
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                            Terima kasih atas kontribusi Anda dalam mendukung gaya hidup hijau dan ekonomi sirkular bersama ReUse!
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            reuse-sustainable-marketplace.com
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
