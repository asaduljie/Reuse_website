"use client";

import Link from "next/link";
import {
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

import StatusBadge from "../common/statusBadge";

interface User{
    id:number;
    name:string;
    email:string;
    phone:string;
    role:string;
    status:string;
    avatar:string;
}

interface Props{
    users:User[];
    onDelete:(id:number)=>void;
}

export default function UserTable({
    users,
    onDelete,
}:Props){
    return(
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                    <tr>
                        <th className="px-6 py-4">
                            User
                        </th>
                        <th className="py-4 text-center">
                            Role
                        </th>
                        <th className="py-4 text-center">
                            Status
                        </th>
                        <th className="py-4 text-center">
                            Phone
                        </th>
                        <th className="py-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>(
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">
                                                {user.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center capitalize">
                                    {user.role.replace("_"," ")}
                                </td>
                                <td className="text-center">
                                    <StatusBadge
                                        status={user.status}
                                    />
                                </td>
                                <td className="text-center">
                                    {user.phone}
                                </td>
                                <td>
                                    <div className="flex justify-center gap-3">
                                        <Link
                                            href={`/dashboard/admin/users/${user.id}`}
                                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"
                                        >
                                            <FaEye/>
                                        </Link>
                                        <Link
                                            href={`/dashboard/admin/users/${user.id}/edit`}
                                            className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center"
                                        >
                                            <FaEdit/>
                                        </Link>
                                        <button
                                            onClick={()=>onDelete(user.id)}
                                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"
                                        >
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
