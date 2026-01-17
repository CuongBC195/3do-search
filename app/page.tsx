import CourseList from '@/components/CourseList';
import { getCourses } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-text-main dark:text-white mb-4 tracking-tight">
          Tìm kiếm câu hỏi & đáp án
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Duyệt qua thư viện câu hỏi từ các khóa học.
          Chọn một khóa học để xem chi tiết các câu hỏi và đáp án.
        </p>
      </div>

      {/* Course List with Search */}
      <CourseList courses={courses} />
    </main>
  );
}
