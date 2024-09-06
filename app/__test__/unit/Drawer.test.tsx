import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Drawer from '../../components/Drawer';
import '@testing-library/jest-dom';

const mockSetOpen = jest.fn();

const mockLaunch = {
    mission_name: 'Test Mission',
    rocket: { rocket_name: 'Test Rocket' },
    launch_year: '2024',
    launch_success: true,
    launch_site: { site_name_long: 'Test Launch Site' },
    details: 'Test mission details',
    links: {
        video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        wikipedia: 'https://en.wikipedia.org/wiki/Test',
        article_link: 'https://test.com',
    },
};

describe('Drawer Component', () => {
    it('should render the drawer with launch details', () => {
        render(<Drawer open={true} setOpen={mockSetOpen} selectedLaunch={mockLaunch} />);

        expect(screen.getByText('Test Mission')).toBeInTheDocument();
        expect(screen.getByText('Test Rocket')).toBeInTheDocument();
        expect(screen.getByText('2024')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('Test Launch Site')).toBeInTheDocument();
        expect(screen.getByText('Test mission details')).toBeInTheDocument();
    });

    it('should call setOpen(false) when close button is clicked', () => {
        render(<Drawer open={true} setOpen={mockSetOpen} selectedLaunch={mockLaunch} />);

        // Find the close button by role
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
});
