import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, blog }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog</h2>}
        >
            <Head title="Blog Show" />

            {/* 詳細画面 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">タイトル</h2>
                            <p>{blog.title}</p>
                            <br />
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">コンテンツ</h2>
                            <p>{blog.content}</p>
                            <div className="flex items-center justify-end mt-4">
                                <Link href={route("blog.index")}>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                        戻る
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
