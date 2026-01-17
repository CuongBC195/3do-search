// Types for API responses

export interface Course {
    course_id: string;
    course_name: string;
    course_description: string;
    course_file: string;
    status: string;
}

export interface Question {
    question: string;
    options: string[];
    answers: string[];
    numOptions: number;
}

export interface CoursesResponse {
    success: boolean;
    data: Course[];
}

export interface QuestionsResponse {
    questions: Question[];
}

const API_BASE = 'https://letankim.id.vn';

export async function getCourses(): Promise<Course[]> {
    const res = await fetch(`${API_BASE}/?act=get_courses`, {
        method: 'POST',
        cache: 'no-store',
    });
    const data: CoursesResponse = await res.json();
    if (data.success) {
        return data.data.filter(course => course.status === 'active');
    }
    return [];
}

export async function getQuestions(courseFile: string): Promise<Question[]> {
    const res = await fetch(`${API_BASE}/3do_resources/${courseFile}`, {
        method: 'POST',
        cache: 'no-store',
    });
    const data: QuestionsResponse = await res.json();
    return data.questions || [];
}
