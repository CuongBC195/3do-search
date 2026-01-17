'use client';

import { useState, useEffect, useMemo } from 'react';
import CourseCard from '@/components/ui/CourseCard';

interface Course {
  course_id: string;
  course_name: string;
  course_description: string;
  course_file: string;
  status: string;
}

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('https://letankim.id.vn/?act=get_courses', {
          method: 'POST',
        });
        const data = await res.json();
        if (data.success) {
          setCourses(data.data.filter((c: Course) => c.status === 'active'));
        } else {
          setError('Không thể tải danh sách khóa học');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Lỗi kết nối API. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

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
        {searchQuery && !loading && (
          <p className="text-sm text-text-secondary mt-3 text-center">
            Tìm thấy <span className="font-bold text-primary">{filteredCourses.length}</span> khóa học
          </p>
        )}
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center px-6 py-3 bg-white dark:bg-surface-dark rounded-2xl shadow-whisper border border-border-subtle">
            <p className="text-3xl font-bold text-primary">{courses.length}</p>
            <p className="text-sm text-text-secondary font-medium">Tổng khóa học</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-3 text-text-secondary">
            <span className="material-symbols-outlined animate-spin text-[32px]">progress_activity</span>
            <span className="text-lg">Đang tải danh sách khóa học...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-[64px] text-red-400 mb-4 block">cloud_off</span>
          <p className="text-text-secondary text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Thử lại
          </button>
        </div>
      )}

      {/* Course Grid */}
      {!loading && !error && (
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
      )}

      {!loading && !error && filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-[64px] text-text-secondary/30 mb-4 block">
            search_off
          </span>
          <p className="text-text-secondary text-lg">
            Không tìm thấy khóa học nào với từ khóa &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </main>
  );
}
