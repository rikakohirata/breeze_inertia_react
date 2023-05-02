import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from "@/Components/PrimaryButton";
import { Head } from '@inertiajs/react';
import { Link } from "@inertiajs/inertia-react";

export default function Index({ auth, blogs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog</h2>}>
            <Head title="Blog Index" />

            {/* 一覧表示 */}
            <div className="p-6 bg-white border-b border-gray-200"> 
                <div>
                    <Link href={route("blog.create")}>
                        <Button type="button">新規作成</Button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>タイトル</th>
                            <th>コンテンツ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => {
                            return (
                                <tr key={blog.id}>
                                    <td className="border px-4 py-2">
                                        {blog.title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {blog.content}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}