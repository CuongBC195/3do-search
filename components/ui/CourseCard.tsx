import Link from 'next/link';

interface CourseCardProps {
    courseId: string;
    courseName: string;
    courseDescription: string;
}

export default function CourseCard({
    courseId,
    courseName,
    courseDescription,
}: CourseCardProps) {
    return (
        <Link
            href={`/courses/${courseId}`}
            className="group bg-white dark:bg-surface-dark rounded-2xl p-6 flex flex-col border border-border-subtle dark:border-zinc-800 hover:border-primary/30 shadow-whisper hover:shadow-hover transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">school</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold font-display text-text-main dark:text-white group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2">
                        {courseName}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-1">{courseDescription}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-border-subtle dark:border-zinc-800 flex items-center justify-end">
                <span className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem chi tiết
                    <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                </span>
            </div>
        </Link>
    );
}
