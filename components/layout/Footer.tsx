import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-border-subtle dark:border-zinc-800 bg-white dark:bg-surface-dark py-8">
            <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
                <p>© 2025 3DOTECH</p>
                <div className="flex gap-6">
                    <Link className="hover:text-primary transition-colors" href="#">
                        Privacy Policy
                    </Link>
                    <Link className="hover:text-primary transition-colors" href="#">
                        Terms of Service
                    </Link>
                    <Link className="hover:text-primary transition-colors" href="#">
                        Help Center
                    </Link>
                </div>
            </div>
        </footer>
    );
}
