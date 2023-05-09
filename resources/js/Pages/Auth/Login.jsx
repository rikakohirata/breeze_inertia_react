import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Head     ヘッダー情報をレンダリングする
// Link     XHRリクエストを行う
// useForm  フォームの処理を行う
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Loginコンポーネント
 * ログインの入力フォーム～POSTリクエストまでの処理
 * @param {*} param0 
 * @returns 
 */

// 引数に、input要素に入力した値を保存する変数の初期値をオブジェクトで指定
// dataの中にemail, password, remerberの値が保存されている
// processingは、処理中の場合にボタンがクリックできないようする
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // useEffect Hook
    // Loginコンポーネントがアンマウントされる時、入力フォームの値をuseFormで指定した初期値にリセットする
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // submit関数のpost関数でルートを指定
    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    {/* valueにdate.emailを指定する
                        onChangeイベントで入力する度にsetDataで値が更新される
                        setDataは第一引数に更新を行う名前、第二引数には値を設定する
                        setDataによって更新されたdataは、submit関数によって指定のルートに送信される */}
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    {/* errorsに、バリデーションに失敗した場合のエラー情報が保存される */}
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
