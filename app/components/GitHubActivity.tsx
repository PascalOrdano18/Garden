'use client';

import { useEffect, useState } from 'react';

const GITHUB_COLORS = [
    '#161b22',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
];

function getColor(count: number) {
    if (count === 0) return GITHUB_COLORS[0];
    if (count <= 3) return GITHUB_COLORS[1];
    if (count <= 6) return GITHUB_COLORS[2];
    if (count <= 9) return GITHUB_COLORS[3];
    return GITHUB_COLORS[4];
}

interface ContributionDay {
    date: string;
    contributionCount: number;
}

interface Week {
    contributionDays: ContributionDay[];
}

interface GitHubResponse {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    weeks: Week[];
                };
            };
        };
    };
}

function useVisibleWeeks(totalWeeks: number) {
    const [count, setCount] = useState(totalWeeks);

    useEffect(() => {
        function update() {
            if (window.innerWidth < 640) {
                setCount(Math.min(totalWeeks, 20));
            } else if (window.innerWidth < 1024) {
                setCount(Math.min(totalWeeks, 36));
            } else {
                setCount(totalWeeks);
            }
        }
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [totalWeeks]);

    return count;
}

export default function GitHubActivity() {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const visibleWeeks = useVisibleWeeks(weeks.length);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch('/api/github-activity');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const data = await response.json() as GitHubResponse;
                const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
                setWeeks(weeks);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching GitHub contributions:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };
        fetchContributions();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-32 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading activity...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6">
                <p className="text-red-400 text-sm sm:text-base">Unable to load GitHub activity: {error}</p>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">Please check if the API route is working and try again later.</p>
            </div>
        );
    }

    const displayedWeeks = weeks.slice(-visibleWeeks);
    const numCols = displayedWeeks.length;
    const grid = Array.from({ length: 7 }, (_, dayIdx) =>
        displayedWeeks.map(week => week.contributionDays[dayIdx])
    );

    return (
        <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-8 px-2 sm:px-6 pt-8 sm:pt-12 lg:pt-20">
            <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                <div
                    className="relative grid gap-[2px] sm:gap-[3px] p-3 sm:p-4"
                    style={{
                        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                        gridTemplateRows: 'repeat(7, 1fr)',
                    }}
                >
                    {grid.map((row, rowIdx) =>
                        row.map((day, colIdx) => (
                            <div
                                key={`${rowIdx}-${colIdx}`}
                                className="aspect-square rounded-sm cursor-pointer hover:ring-1 hover:ring-gray-400 transition-all"
                                style={{
                                    backgroundColor: getColor(day ? day.contributionCount : 0),
                                }}
                                title={day ? `${day.date}: ${day.contributionCount} contributions` : ''}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-2 text-xs sm:text-sm text-gray-400">
                <span className="mr-2">Less</span>
                <div className="flex gap-1">
                    {GITHUB_COLORS.map((color) => (
                        <div key={color} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ backgroundColor: color }} />
                    ))}
                </div>
                <span className="ml-2">More</span>
            </div>
        </div>
    );
} 