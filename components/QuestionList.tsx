'use client';

import { useState, useMemo } from 'react';
import QuestionCard from '@/components/ui/QuestionCard';
import { Question } from '@/lib/api';

interface QuestionListProps {
    questions: Question[];
}

export default function QuestionList({ questions }: QuestionListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredQuestions = useMemo(() => {
        if (!searchQuery.trim()) return questions;

        const query = searchQuery.toLowerCase();
        return questions.filter(
            (q) =>
                q.question.toLowerCase().includes(query) ||
                q.options.some(opt => opt.toLowerCase().includes(query))
        );
    }, [questions, searchQuery]);

    return (
        <>
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

            {/* Questions List */}
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
                    <p className="text-text-secondary">
                        Không tìm thấy câu hỏi nào
                    </p>
                </div>
            )}
        </>
    );
}
