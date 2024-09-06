'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  RocketLaunchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@apollo/client';
import { GET_LAUNCHES } from '../graphql/queries';


const navigation = [
  { name: 'Deployments', href: '#', icon: RocketLaunchIcon, current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Deployments() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  const [searchTerm, setSearchTerm] = useState('');


  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
    );
  }

  console.log(data)

  const filteredLaunches = data.launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
      <>
        <div>
          <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 flex">
              <DialogPanel
                  transition
                  className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center"/>
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
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                    )}
                                >
                                  <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                  {item.name}
                                </a>
                              </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center"/>
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
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                )}
                            >
                              <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                              {item.name}
                            </a>
                          </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Separator */}
              <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form action="#" method="GET" className="relative flex flex-1">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  />
                  <input
                      id="search-field"
                      name="search"
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search launches..."
                      className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  />
                </form>
              </div>
            </div>
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                <div>
                  <h1 className="text-2xl font-bold mb-4">SpaceX Launches</h1>
                  <ul className="space-y-4">
                    {filteredLaunches.map((launch) => (
                        <li key={launch.id}
                            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
                          <a href={`/launch/${launch.id}`} className="flex justify-between items-center">
                            <span className="text-lg font-medium">{launch.mission_name}</span>
                            <span className="text-gray-500">{launch.rocket.rocket_name} ({launch.launch_year})</span>
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
  )
}
