'use client';

import { useState, useMemo } from 'react';
import CourseCard from '@/components/ui/CourseCard';
import { Course } from '@/lib/api';

interface CourseListProps {
    courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = useMemo(() => {
        if (!searchQuery.trim()) return courses;

        const query = searchQuery.toLowerCase();
        return courses.filter(
            (course) =>
                course.course_name.toLowerCase().includes(query) ||
                course.course_description.toLowerCase().includes(query)
        );
    }, [courses, searchQuery]);

    return (
        <>
            {/* Search */}
            <div className="w-full max-w-xl mx-auto mb-10">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full pl-14 pr-6 py-4 bg-white dark:bg-surface-dark border border-border-subtle dark:border-zinc-700 rounded-2xl text-base font-medium placeholder-text-secondary shadow-whisper focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Tìm kiếm khóa học..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-primary"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-sm text-text-secondary mt-3 text-center">
                        Tìm thấy <span className="font-bold text-primary">{filteredCourses.length}</span> khóa học
                    </p>
                )}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-10">
                <div className="text-center px-6 py-3 bg-white dark:bg-surface-dark rounded-2xl shadow-whisper border border-border-subtle">
                    <p className="text-3xl font-bold text-primary">{courses.length}</p>
                    <p className="text-sm text-text-secondary font-medium">Tổng khóa học</p>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                    <CourseCard
                        key={course.course_id}
                        courseId={course.course_id}
                        courseName={course.course_name}
                        courseDescription={course.course_description}
                    />
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-16">
                    <span className="material-symbols-outlined text-[64px] text-text-secondary/30 mb-4 block">
                        search_off
                    </span>
                    <p className="text-text-secondary text-lg">
                        Không tìm thấy khóa học nào với từ khóa &quot;{searchQuery}&quot;
                    </p>
                </div>
            )}
        </>
    );
}
