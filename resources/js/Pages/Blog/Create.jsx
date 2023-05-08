import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';          // 入力フォームのラベル
import TextInput from '@/Components/TextInput';            // 入力フォーム
import PrimaryButton from '@/Components/PrimaryButton';    // ボタン
import InputError from '@/Components/InputError';          // バリデーション
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("blog.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog</h2>}
        >
            <Head title="Blog Create" />

            {/* 新規登録フォーム */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <InputError errors={errors} />
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel forInput="title" value="Title" />
                                    <TextInput
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div>
                                    <InputLabel forInput="content" value="Content" />
                                    <TextInput
                                        type="text"
                                        name="content"
                                        value={data.content}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" processing={processing}>
                                        作成
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
