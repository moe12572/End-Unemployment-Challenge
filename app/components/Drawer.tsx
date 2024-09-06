'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

// Helper function to extract YouTube video ID from a URL
const getYoutubeVideoId = (url) => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
};

// Drawer Component
export default function Drawer({ open, setOpen, selectedLaunch }) {
    const youtubeId = selectedLaunch?.links?.video_link ? getYoutubeVideoId(selectedLaunch.links.video_link) : null;

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-25" />

            {/* Drawer Panel */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

                                {/* Black Banner/Header */}
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
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Launch Details */}
                                <div className="relative flex-1 px-6 py-6 space-y-4">
                                    <div className="space-y-3">
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
                                    </div>

                                    {/* More Info Links */}
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
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
