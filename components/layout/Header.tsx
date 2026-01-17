import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-subtle dark:border-zinc-800">
            <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link href="/" className="shrink-0 flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="3Do-Search Logo"
                        width={48}
                        height={48}
                        className="rounded-lg"
                        priority
                    />
                    <span className="text-xl font-bold text-text-main dark:text-white hidden sm:inline">
                        3Do-Search
                    </span>
                </Link>

                {/* Right Actions */}
                <a
                    href="https://www.facebook.com/chicuong.trumdv.fptu/?locale=vi_VN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                    <span className="hidden sm:inline">Đóng góp nội dung</span>
                </a>
            </div>
        </header>
    );
}
