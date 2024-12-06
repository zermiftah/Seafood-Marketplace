
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import {
  FolderIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Account', href: '/ADMIN', icon: FolderIcon, current: false },
  { name: 'Master Data FI', href: '/MasterData', icon: ServerIcon, current: false },
  { name: 'Daily Issue', href: '/DailyIssue', icon: SignalIcon, current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Account_list() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://172.16.206.4:2001/fi_accounts')
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError(error);
      });
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    navigate('/');

    const data = {
      ID_FI: null,
      LAST_LOGIN: null,
      TOKEN: token,
      ROLE: null,
      STATUS: 'NOT ACTIVED',
      PC_NAME: null,
      IP_ADDRESS: null,
    };

    console.log('Sending data:', data);

    try {
      const response = await axios.put('http://172.16.206.4:2001/updateFI_Account', data);

      if (response.status === 200) {
        console.log('LAST_LOGIN updated successfully');
        localStorage.removeItem('token');
      } else {
        console.error('Failed to update LAST_LOGIN');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-900 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-900',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-900"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-900"
                              src="https://i.pinimg.com/564x/ca/72/e0/ca72e0521cdaef62c8b7c14f6f861d8c.jpg"
                              alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Administrator</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="xl:pl-72 bg-gray-900 min-h-screen">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <main>
            <header>
              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-900 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                <div>
                  <div className="flex items-center gap-x-3">
                    <h1 className="flex gap-x-3 text-lg leading-7">
                      <span className="font-semibold text-white">FI</span>
                      <span className="text-gray-600">/</span>
                      <span className="font-semibold text-lg text-white">Account List</span>
                    </h1>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-400">A list of all the account</p>
                </div>
                <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
                  Production
                </div>
              </div>
            </header>

            {/* Activity list */}
            <div className="border-t border-white/10 pt-11">
              <div className="mx-4 sm:mx-6 lg:mx-8">
                <table className="mt-6 w-full whitespace-nowrap text-left shadow-lg rounded-lg bg-gray-800">
                  <colgroup>
                    <col className="w-full sm:w-4/12" />
                    <col className="lg:w-4/12" />
                    <col className="lg:w-2/12" />
                    <col className="lg:w-1/12" />
                    <col className="lg:w-1/12" />
                  </colgroup>
                  <thead className="border-b border-gray-700 text-lg leading-6 bg-gray-600 text-gray-300">
                    <tr>
                      <th scope="col" className="py-3 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                        USER 
                      </th>
                      <th scope="col" className="hidden py-3 pl-0 pr-8 font-semibold sm:table-cell">
                        TOKEN 
                      </th>
                      <th scope="col" className="py-3 pl-0 pr-4 text-center font-semibold sm:pr-8 sm:text-left lg:pr-20 ">
                        ROLE 
                      </th>
                      <th scope="col" className="hidden py-3 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                        STATUS 
                      </th>
                      <th scope="col" className="hidden py-3 pl-0 pr-4 text-center font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                        LAST LOGIN 
                      </th>
                      <th scope="col" className="hidden py-3 pl-0 pr-4 text-center font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                        IP ADDRESS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 bg-gray-800">
                    {accounts.map((account) => (
                      <tr key={account.ID_FI} className="hover:bg-gray-700 transition duration-300 rounded-lg">
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                          <div className="flex items-center gap-x-4">
                            <div className="truncate text-lg font-medium leading-6 text-white">{account.ID_FI}</div>
                          </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                          <div className="flex gap-x-3">
                            <div className="font-mono text-lg leading-6 text-gray-400">{account.TOKEN}</div>
                          </div>
                        </td>
                        <td className="py-4 pl-0 pr-4 text-lg leading-6 sm:pr-8 lg:pr-20 text-white">
                          <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                            <div className="hidden sm:block">{account.ROLE}</div>
                          </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-lg leading-6 text-gray-400 md:table-cell lg:pr-20">
                          <div
                            className={`flex items-center space-x-2 p-2 rounded-full text-lg font-medium ${account.STATUS === 'ACTIVED' ? 'text-green-300' : 'text-red-300'}`}
                          >
                            <div
                              className={`h-3 w-3 rounded-full ${account.STATUS === 'ACTIVED'
                                ? 'bg-green-500 border-2 border-green-800'
                                : 'bg-red-500 border-2 border-red-800'
                                } `}
                            />
                            <span>{account.STATUS}</span>
                          </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 text-center text-lg leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                          {account.LAST_LOGIN}
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 text-center text-lg leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                          {(account.IP_ADDRESS || '').replace(/^::ffff:/, '')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
