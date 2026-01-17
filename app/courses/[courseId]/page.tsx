import Link from 'next/link';
import QuestionList from '@/components/QuestionList';
import { getCourses, getQuestions } from '@/lib/api';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface CoursePageProps {
    params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
    const { courseId } = await params;

    // Get course info
    const courses = await getCourses();
    const course = courses.find(c => c.course_id === courseId);

    if (!course) {
        notFound();
    }

    // Get questions for this course
    const questions = await getQuestions(course.course_file);

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

            {/* Questions */}
            <QuestionList questions={questions} />

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
