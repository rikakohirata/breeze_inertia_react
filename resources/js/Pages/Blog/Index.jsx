import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';  // ボタン
import { Head, Link, useForm  } from '@inertiajs/react';

// 引数blogsでコントローラで指定したパラメータを受け取る
export default function Index({ auth, blogs }) {

    // useFormのdeleteプロパティに新しい変数名としてdestroyを代入
    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        // useFormのdestory関数を使用
        // 第一引数にルートと削除するデータのidを指定、第二引数は任意
        destroy(route("blog.destroy", id), {
            // データ削除後、削除ボタンを押した場所に戻る
            preserveScroll: true,   
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog</h2>}
        >
            <Head title="Blog Index" />

            {/* 一覧表示 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200"> 
                            <div>
                                {/* 新規作成ボタン
                                    新規登録フォームへ遷移する */}
                                <Link href={route("blog.create")}>
                                    <PrimaryButton type="button">新規作成</PrimaryButton>
                                </Link>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>タイトル</th>
                                        <th>コンテンツ</th>
                                        <th>詳細</th>
                                        <th>更新</th>
                                        <th>削除</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* コントローラで受け取ったblogsをmap関数で展開 */}
                                    {blogs.map((blog) => {
                                        return (
                                            <tr key={blog.id}>
                                                <td className="border px-4 py-2">
                                                    {blog.title}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {blog.content}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {/* 詳細ボタン
                                                        引数で指定したidのブログの詳細画面へ遷移する */}
                                                    <Link href={route("blog.show", blog.id)}>
                                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold">
                                                            詳細
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {/* 更新ボタン
                                                        更新フォームへ遷移する */}
                                                    <Link href={route("blog.edit", blog.id)}>
                                                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                                            更新
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {/* 削除ボタン
                                                        onClickイベントでhandleDelete関数が実行される
                                                        引数に削除するデータのidを指定する */}
                                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                                        onClick={() => handleDelete(blog.id)}
                                                    >
                                                        削除
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}