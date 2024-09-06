'use client'

import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import React from 'react';

interface SelectedLaunch {
    mission_name?: string;
    rocket?: {
        rocket_name?: string;
    };
    launch_year?: string;
    launch_success?: boolean;
    launch_site?: {
        site_name_long?: string;
    };
    details?: string;
    links?: {
        video_link?: string;
        wikipedia?: string;
        article_link?: string;
    };
}

interface DrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedLaunch: SelectedLaunch | null;
}

// Helper function to extract YouTube video ID from a URL
const getYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
};

// Drawer Component with smooth transitions
export default function Drawer({ open, setOpen, selectedLaunch }: DrawerProps) {
    const youtubeId = selectedLaunch?.links?.video_link ? getYoutubeVideoId(selectedLaunch.links.video_link) : null;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in-out duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <DialogPanel className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    {/* Header */}
                                    <div className="bg-black px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between my-2">
                                            <DialogTitle className="text-lg font-semibold leading-6 text-white">
                                                {selectedLaunch?.mission_name || 'Launch Details'}
                                            </DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative rounded-md bg-black text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                >
                                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body content */}
                                    <div className="relative flex-1 px-6 py-6 space-y-4">
                                        {/* Rocket Name */}
                                        <div>
                                            <span className="block text-lg text-gray-500">Rocket:</span>
                                            <p className="text-md text-gray-700">{selectedLaunch?.rocket?.rocket_name || 'N/A'}</p>
                                        </div>

                                        {/* Launch Year */}
                                        <div>
                                            <span className="block text-lg text-gray-500">Launch Year:</span>
                                            <p className="text-md text-gray-700">{selectedLaunch?.launch_year || 'N/A'}</p>
                                        </div>

                                        {/* Launch Success */}
                                        <div>
                                            <span className="block text-lg text-gray-500">Launch Success:</span>
                                            <p className={`text-md ${selectedLaunch?.launch_success ? 'text-green-600' : 'text-red-600'}`}>
                                                {selectedLaunch?.launch_success ? 'Yes' : 'No'}
                                            </p>
                                        </div>

                                        {/* Launch Site */}
                                        <div>
                                            <span className="block text-lg text-gray-500">Launch Site:</span>
                                            <p className="text-md text-gray-700">{selectedLaunch?.launch_site?.site_name_long || 'N/A'}</p>
                                        </div>

                                        {/* YouTube Video Embed */}
                                        {youtubeId && (
                                            <div className="relative w-full h-56 sm:h-64">
                                                <iframe
                                                    className="w-full h-full rounded-md"
                                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                                    title="YouTube video"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        )}

                                        {/* Details */}
                                        <div>
                                            <span className="block text-lg text-gray-500">Details:</span>
                                            <p className="text-md text-gray-700">{selectedLaunch?.details || 'No details available'}</p>
                                        </div>

                                        {/* Links */}
                                        <div className="space-y-2">
                                            <span className="block text-lg text-gray-500">More Info:</span>
                                            <div className="flex flex-col space-y-1">
                                                {selectedLaunch?.links?.wikipedia && (
                                                    <a
                                                        href={selectedLaunch.links.wikipedia}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Wikipedia
                                                    </a>
                                                )}
                                                {selectedLaunch?.links?.article_link && (
                                                    <a
                                                        href={selectedLaunch.links.article_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Article
                                                    </a>
                                                )}
                                                {selectedLaunch?.links?.video_link && (
                                                    <a
                                                        href={selectedLaunch.links.video_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Video
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
