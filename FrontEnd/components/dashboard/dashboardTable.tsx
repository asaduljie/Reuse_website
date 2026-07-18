"use client";

import { ReactNode } from "react";

interface Column {

  key: string;

  label: string;

}

interface DashboardTableProps {

  columns: Column[];

  data: any[];

  actions?: (row: any) => ReactNode;

}

export default function DashboardTable({

  columns,

  data,

  actions,

}: DashboardTableProps) {

  return (

    <div

      className="
      bg-white
      rounded-[30px]
      shadow-sm
      overflow-hidden
      "

    >

      <table

        className="
        w-full
        "

      >

        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
          <tr>
            {
              columns.map((column)=>(
                <th
                  key={column.key}
                  className="px-6 py-4 text-left font-semibold"
                >
                  {column.label}
                </th>
              ))
            }
            {
              actions &&
              <th className="px-6 py-4">
                Action
              </th>
            }
          </tr>
        </thead>

        <tbody>

          {

            data.length===0

            ?

            <tr>

              <td

                colSpan={

                  columns.length+1

                }

                className="
                py-16
                text-center
                text-gray-500
                "

              >

                Tidak ada data.

              </td>

            </tr>

            :

            data.map(

              (row,index)=>(

                <tr

                  key={index}

                  className="
                  border-b
                  hover:bg-gray-50
                  transition
                  "

                >

                  {

                    columns.map(

                      (column)=>(

                        <td

                          key={column.key}

                          className="
                          px-6
                          py-5
                          "

                        >

                          {

                            row[column.key]

                          }

                        </td>

                      )

                    )

                  }

                  {

                    actions &&

                    <td

                      className="
                      px-6
                      py-5
                      "

                    >

                      {

                        actions(row)

                      }

                    </td>

                  }

                </tr>

              )

            )

          }

        </tbody>

      </table>

    </div>

  );

}