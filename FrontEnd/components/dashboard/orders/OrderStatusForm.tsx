"use client";

import { useState } from "react";

interface OrderStatusFormProps {

    currentStatus: string;

    onSave: (status: string) => void;

}

const STATUS = [

    "Pending",

    "Seller Confirmed",

    "Packing",

    "Ready to Pickup",

    "Completed",

    "Cancelled",

];

export default function OrderStatusForm({

    currentStatus,

    onSave,

}: OrderStatusFormProps) {

    const [status, setStatus] = useState(currentStatus);

    return (

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-xl font-bold mb-6">

                Update Order Status

            </h2>

            <div className="grid md:grid-cols-[1fr_auto] gap-4">

                <select

                    value={status}

                    onChange={(e)=>setStatus(e.target.value)}

                    className="border rounded-xl px-4 py-3"

                >

                    {

                        STATUS.map(item=>(

                            <option

                                key={item}

                                value={item}

                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

                <button

                    onClick={()=>onSave(status)}

                    className="bg-[#145A3B] hover:bg-[#0F472E] text-white rounded-xl px-8 py-3 font-semibold transition cursor-pointer"

                >

                    Save Status

                </button>

            </div>

        </div>

    );

}
