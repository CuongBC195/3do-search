interface QuestionCardProps {
    index: number;
    question: string;
    options: string[];
    answers: string[];
}

export default function QuestionCard({
    index,
    question,
    options,
    answers,
}: QuestionCardProps) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Normalize answers: split "B C D" or "B, C, D" into separate letters
    const normalizedAnswers = answers.flatMap(answer => {
        const trimmed = answer.trim();
        // If it's just letters separated by spaces/commas (like "B C D")
        if (/^[A-Fa-f](\s*[,\s]\s*[A-Fa-f])*$/.test(trimmed)) {
            return trimmed.split(/[\s,]+/).map(a => a.trim().toUpperCase()).filter(Boolean);
        }
        return [trimmed];
    });

    // Check if all answers are single letters
    const allLetterAnswers = normalizedAnswers.every(
        a => a.length === 1 && letters.includes(a.toUpperCase())
    );

    // Helper to check if an option is correct
    const isOptionCorrect = (option: string, idx: number): boolean => {
        const optionLetter = option.charAt(0).toUpperCase();
        const indexLetter = letters[idx];

        // If all answers are single letters, ONLY match by letter
        if (allLetterAnswers) {
            return normalizedAnswers.some(answer => {
                const answerUpper = answer.toUpperCase();
                return answerUpper === optionLetter || answerUpper === indexLetter;
            });
        }

        // For text-based answers, require exact or near-exact match
        const optionTextClean = getOptionText(option).toLowerCase().trim();
        return normalizedAnswers.some(answer => {
            const answerLower = answer.toLowerCase().trim();
            // Exact match or one contains the other completely (but must be substantial match)
            if (optionTextClean === answerLower) return true;
            // Only match if answer is at least 10 chars and is very close to option
            if (answerLower.length >= 10 && optionTextClean.includes(answerLower)) return true;
            if (optionTextClean.length >= 10 && answerLower.includes(optionTextClean)) return true;
            return false;
        });
    };

    // Extract letter from option or generate from index
    const getOptionLetter = (option: string, idx: number): string => {
        const firstChar = option.charAt(0).toUpperCase();
        if (letters.includes(firstChar) && /^[A-Fa-f][\.\)\:\s]/.test(option)) {
            return firstChar;
        }
        return letters[idx] || String(idx + 1);
    };

    // Get clean option text without prefix
    function getOptionText(option: string): string {
        return option.replace(/^[A-Fa-f][\.\)\:\s]+\s*/, '');
    }

    return (
        <article className="bg-white dark:bg-surface-dark rounded-2xl border border-border-subtle dark:border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800/50 border-b border-border-subtle dark:border-zinc-700 flex items-center gap-4">
                <span className="shrink-0 size-9 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {index}
                </span>
                <h3 className="text-base font-semibold text-text-main dark:text-white leading-relaxed">
                    {question}
                </h3>
            </div>

            {/* Options */}
            <div className="p-6">
                {options.length > 0 ? (
                    <div className="grid gap-3">
                        {options.map((option, idx) => {
                            const isCorrect = isOptionCorrect(option, idx);
                            const letter = getOptionLetter(option, idx);
                            const text = getOptionText(option);

                            return (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${isCorrect
                                            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                                            : 'bg-gray-50 dark:bg-zinc-800/30 border-gray-100 dark:border-zinc-700'
                                        }`}
                                >
                                    <span className={`shrink-0 size-7 rounded-full flex items-center justify-center text-sm font-bold ${isCorrect
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 dark:bg-zinc-700 text-text-secondary'
                                        }`}>
                                        {letter}
                                    </span>
                                    <span className={`text-sm ${isCorrect
                                            ? 'text-green-700 dark:text-green-300 font-medium'
                                            : 'text-text-main dark:text-gray-300'
                                        }`}>
                                        {text}
                                    </span>
                                    {isCorrect && (
                                        <span className="ml-auto material-symbols-outlined text-green-500 text-[20px]">
                                            check_circle
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-text-secondary text-sm italic">Không có lựa chọn</p>
                )}

                {/* Answer Badge */}
                <div className="mt-4 pt-4 border-t border-border-subtle dark:border-zinc-700 flex items-center justify-end">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        Đáp án: {normalizedAnswers.join(', ')}
                    </span>
                </div>
            </div>
        </article>
    );
}
