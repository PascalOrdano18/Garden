'use client';

import { useEffect, useState } from 'react';

const GITHUB_COLORS = [
    '#161b22', // 0 contributions
    '#0e4429', // 1-3 contributions
    '#006d32', // 4-6 contributions
    '#26a641', // 7-9 contributions
    '#39d353', // 10+ contributions
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

export default function GitHubActivity() {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6 bg-black/30 backdrop-blur-sm rounded-lg">
                <p className="text-red-400 text-sm sm:text-base">Unable to load GitHub activity: {error}</p>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">Please check if the API route is working and try again later.</p>
            </div>
        );
    }

    // GitHub calendar: columns = weeks, rows = days (Sun-Sat)
    // Transpose weeks to get days as rows
    const numRows = 7;
    const numCols = weeks.length;
    const grid = Array.from({ length: numRows }, (_, dayIdx) =>
        weeks.map(week => week.contributionDays[dayIdx])
    );

    return (
        <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6 bg-black/30 backdrop-blur-sm rounded-lg pt-8 sm:pt-12 lg:pt-20">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="grid gap-[1px] sm:gap-[2px]" style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(7, minmax(0, 1fr))` }}>
                        {grid.map((row, rowIdx) =>
                            row.map((day, colIdx) => (
                                <div
                                    key={`${rowIdx}-${colIdx}`}
                                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-gray-400 transition-all"
                                    style={{
                                        backgroundColor: getColor(day ? day.contributionCount : 0),
                                    }}
                                    title={day ? `${day.date}: ${day.contributionCount} contributions` : ''}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-2 text-xs sm:text-sm text-gray-400">
                <span className="mr-2">Less</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#161b22]" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#0e4429]" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#006d32]" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#26a641]" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#39d353]" />
                </div>
                <span className="ml-2">More</span>
            </div>
        </div>
    );
} 