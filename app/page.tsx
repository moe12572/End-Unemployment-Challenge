'use client'

import { useState, useEffect } from 'react';
import {
  Bars3Icon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@apollo/client';
import { GET_LAUNCHES } from '../graphql/queries';
import Lottie from 'lottie-react';
import loadingAnimation from '../public/loading.json';
import Drawer from "@/app/components/Drawer";
import { format } from 'date-fns';
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import debounce from 'lodash.debounce';
import Image from 'next/image';
import logo from '../public/logo.png';

const navigation = [
  { name: 'Deployments', href: '#', icon: RocketLaunchIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Deployments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState(null); // Track selected launch
  const [searchTerm, setSearchTerm] = useState('');
  const [limit] = useState(20); // Limit of launches to load initially
  const [offset] = useState(0); // Offset for pagination
  const [launches, setLaunches] = useState([]); // To store loaded launches
  const [loadingMore, setLoadingMore] = useState(false); // Track loading more launches
  const [hasMore, setHasMore] = useState(true); // Track if there's more data to load

  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { limit, offset, order: 'DESC' }, // Ensure newest launches come first
    notifyOnNetworkStatusChange: true,
  });


  console.log(data)

  const selectLaunch = (launch) => {
    setSelectedLaunch(launch);  // Set the selected launch
    setSidebarOpen(true);       // Open the drawer
  };

  const loadMoreLaunches = () => {
    if (loadingMore || !hasMore) return; // Prevent multiple requests at once or if no more data
    setLoadingMore(true);

    fetchMore({
      variables: {
        offset: launches.length, // Use the current length of loaded launches as the new offset
      },
    }).then(({ data }) => {
      if (data.launches.length === 0) {
        setHasMore(false); // If no new launches, set hasMore to false
      } else {
        setLaunches([...launches, ...data.launches]); // Append the new launches to the existing ones
      }
      setLoadingMore(false);
    }).catch(() => {
      setLoadingMore(false); // Handle error
    });
  };

  // Debounce the scroll event handler to limit how often it fires
  const handleScroll = debounce(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
      loadMoreLaunches();
    }
  }, 300);

  useEffect(() => {
    if (data) {
      setLaunches(data.launches); // Set initial launches
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (loading && !launches.length) {
    return (
        <div className="flex items-center justify-center h-screen">
          <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} />
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

  const filteredLaunches = launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <>
        <div>
          <Drawer open={sidebarOpen} setOpen={setSidebarOpen} selectedLaunch={selectedLaunch} />
          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
              <div className="flex h-16 shrink-0 mt-4 items-center">
                <Image src={logo} alt="Logo" width={150} height={150}/>
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
                                    item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                )}
                            >
                              <item.icon aria-hidden="true" className="h-6 w-6 shrink-0"/>
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
            <div
                className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form action="#" method="GET" className="relative flex flex-1">
                  <label htmlFor="search-field" className="sr-only">Search</label>
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
                        <li
                            key={launch.id}
                            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer"
                            onClick={() => selectLaunch(launch)} // Click to select the launch
                        >
                          <div className="flex justify-between items-center">
                            {/* Mission name on the left */}
                            <div className="flex flex-col items-start">
                              <span className="text-lg font-medium">{launch.mission_name}</span>
                              <span className="text-gray-500">{launch.rocket.rocket_name}</span>
                            </div>
                            <div className="flex flex-row align-middle justify-center">
                              <div className="text-gray-500">
                                {launch.launch_date_local
                                    ? format(new Date(launch.launch_date_local), 'MM-dd-yyyy')
                                    : 'N/A'}
                              </div>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-2" aria-hidden="true" />
                            </div>
                          </div>
                        </li>
                    ))}
                  </ul>
                  {loadingMore && (
                      <div className="flex items-center justify-center py-4">
                        <Lottie animationData={loadingAnimation} style={{ width: 50, height: 50 }} />
                        <p className="text-gray-500 ml-2">Loading more...</p>
                      </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
  );
}
