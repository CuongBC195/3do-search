'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QuestionCard from '@/components/ui/QuestionCard';

interface Course {
    course_id: string;
    course_name: string;
    course_description: string;
    course_file: string;
    status: string;
}

interface Question {
    question: string;
    options: string[];
    answers: string[];
    numOptions: number;
}

export default function CoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch courses first
                const coursesRes = await fetch('https://letankim.id.vn/?act=get_courses', {
                    method: 'POST',
                });
                const coursesData = await coursesRes.json();

                if (!coursesData.success) {
                    setError('Không thể tải thông tin khóa học');
                    setLoading(false);
                    return;
                }

                const foundCourse = coursesData.data.find((c: Course) => c.course_id === courseId);
                if (!foundCourse) {
                    setError('Không tìm thấy khóa học');
                    setLoading(false);
                    return;
                }

                setCourse(foundCourse);

                // Fetch questions
                const questionsRes = await fetch(
                    `https://letankim.id.vn/3do_resources/${foundCourse.course_file}`,
                    { method: 'POST' }
                );
                const questionsData = await questionsRes.json();
                setQuestions(questionsData.questions || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Lỗi kết nối API. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        }

        if (courseId) {
            fetchData();
        }
    }, [courseId]);

    const filteredQuestions = useMemo(() => {
        if (!searchQuery.trim()) return questions;
        const query = searchQuery.toLowerCase();
        return questions.filter(
            (q) =>
                q.question.toLowerCase().includes(query) ||
                q.options.some(opt => opt.toLowerCase().includes(query))
        );
    }, [questions, searchQuery]);

    if (loading) {
        return (
            <main className="flex-1 w-full max-w-[900px] mx-auto px-6 py-10 md:py-14">
                <div className="text-center py-16">
                    <div className="inline-flex items-center gap-3 text-text-secondary">
                        <span className="material-symbols-outlined animate-spin text-[32px]">progress_activity</span>
                        <span className="text-lg">Đang tải câu hỏi...</span>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !course) {
        return (
            <main className="flex-1 w-full max-w-[900px] mx-auto px-6 py-10 md:py-14">
                <div className="text-center py-16">
                    <span className="material-symbols-outlined text-[64px] text-red-400 mb-4 block">error</span>
                    <p className="text-text-secondary text-lg mb-4">{error || 'Đã xảy ra lỗi'}</p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-text-main rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Về trang chủ
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                            Thử lại
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 w-full max-w-[900px] mx-auto px-6 py-10 md:py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
                <Link href="/" className="text-text-secondary hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">home</span>
                    Trang chủ
                </Link>
                <span className="material-symbols-outlined text-[16px] text-text-secondary/50">chevron_right</span>
                <span className="font-semibold text-text-main dark:text-white truncate max-w-[200px]">
                    {course.course_name}
                </span>
            </nav>

            {/* Header Card */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-border-subtle dark:border-zinc-800 p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[32px]">school</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl md:text-3xl font-bold font-display text-text-main dark:text-white mb-2">
                            {course.course_name}
                        </h1>
                        <p className="text-text-secondary mb-4">{course.course_description}</p>
                        <div className="flex items-center">
                            <span className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-bold">
                                <span className="material-symbols-outlined text-[18px]">quiz</span>
                                {questions.length} câu hỏi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-8">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary">search</span>
                    </div>
                    <input
                        className="block w-full pl-12 pr-12 py-3.5 bg-white dark:bg-surface-dark border border-border-subtle dark:border-zinc-700 rounded-xl text-sm font-medium placeholder-text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Tìm kiếm câu hỏi..."
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
                    <p className="text-sm text-text-secondary mt-2">
                        Tìm thấy <span className="font-bold text-primary">{filteredQuestions.length}</span> / {questions.length} câu hỏi
                    </p>
                )}
            </div>

            {/* Questions */}
            <div className="space-y-5">
                {filteredQuestions.map((q, idx) => (
                    <QuestionCard
                        key={idx}
                        index={idx + 1}
                        question={q.question}
                        options={q.options}
                        answers={q.answers}
                    />
                ))}
            </div>

            {filteredQuestions.length === 0 && searchQuery && (
                <div className="text-center py-12">
                    <span className="material-symbols-outlined text-[48px] text-text-secondary/30 mb-3 block">
                        search_off
                    </span>
                    <p className="text-text-secondary">Không tìm thấy câu hỏi nào</p>
                </div>
            )}

            {/* Back button */}
            <div className="mt-10 pt-6 border-t border-border-subtle">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-primary font-medium transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Quay lại danh sách khóa học
                </Link>
            </div>
        </main>
    );
}
