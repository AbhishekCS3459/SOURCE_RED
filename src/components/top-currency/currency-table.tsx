'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

interface Repo {
  id: number;
  html_url: string;
  full_name: string;
  description: string;
  stargazers_count: number;
}

const COLUMNS = [
  {
    Header: 'projectID',
    accessor: 'id',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: 'Name',
    accessor: 'full_name',
    Cell: ({ cell: { value } }) => (
      <div className="mb-5 grid grid-cols-3 gap-4 text-sm text-gray-900 last:mb-0 dark:text-white">
        <div className="col-span-2 flex items-center gap-2">
          <span className="flex flex-col gap-0.5">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-xs font-medium capitalize text-blue-600 hover:underline"
            >
              {value}
            </a>
          </span>
        </div>
      </div>
    ),
    minWidth: 140,
    maxWidth: 260,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        Description
      </div>
    ),
    accessor: 'description',
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 100,
    maxWidth: 400,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        Stars
      </div>
    ),
    accessor: 'stargazers_count',
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value} ⭐</div>
    ),
    minWidth: 100,
    maxWidth: 140,
  },
];

export default function TopCurrencyTable() {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const [data, setData] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch('/api/repos');
      const data = await res.json();
      setData(data.items);
    };

    fetchRepos();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    state,
    headerGroups,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
  );

  const { pageIndex } = state;

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
            Top Projects
          </h2>
        </div>
      </div>
      <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <div className="px-0.5">
            <table
              {...getTableProps()}
              className="transaction-table w-full border-separate border-0"
            >
              <thead className="text-sm text-gray-500 dark:text-gray-300">
                {headerGroups.map((headerGroup, idx) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                        key={idx}
                        className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                      >
                        <div className="flex items-center">
                          {column.render('Header')}
                          {column.canResize && (
                            <div
                              {...column.getResizerProps()}
                              className={`resizer ${
                                column.isResizing ? 'isResizing' : ''
                              }`}
                            />
                          )}
                          <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}
