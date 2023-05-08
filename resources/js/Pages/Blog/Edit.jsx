import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';          // 入力フォームのラベル
import TextInput from '@/Components/TextInput';            // 入力フォーム
import PrimaryButton from '@/Components/PrimaryButton';    // ボタン
import InputError from '@/Components/InputError';          // バリデーション
import { Head, useForm  } from '@inertiajs/react';

export default function Edit({ auth, blog }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: blog.title,
        content: blog.content,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('blog.update', blog.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog</h2>}
        >
            <Head title="Blog Edit" />

            {/* 更新フォーム */}
            <form onSubmit={submit}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <div>
                                    <InputLabel forInput="title" value="Title" />

                                    <TextInput
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />

                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel forInput="content" value="Content" />

                                    <TextInput
                                        type="text"
                                        name="content"
                                        value={data.content}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('content', e.target.value)}
                                    />

                                    <InputError message={errors.content} className="mt-2" />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" processing={processing}>
                                        更新
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
