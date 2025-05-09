// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            name: isRegister ? Yup.string().required('İsim zorunlu') : Yup.string(),
            email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
            password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre zorunlu'),
            password_confirmation: isRegister
                ? Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
                    .required('Şifre tekrar zorunlu')
                : Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                let res;
                if (isRegister) {
                    res = await register(values);
                    toast.success('Kayıt başarılı!');
                } else {
                    res = await login({ email: values.email, password: values.password });
                    toast.success('Giriş başarılı!');
                }
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            } catch (error) {
                if (error.response?.data?.errors) {
                    Object.values(error.response.data.errors).forEach((msgList) => {
                        msgList.forEach((msg) => toast.error(msg));
                    });
                } else {
                    toast.error(error.response?.data?.message || 'İşlem başarısız!');
                }
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="İsim"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="w-full p-3 border border-gray-300 rounded"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email adresi"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Şifre"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {isRegister && (
                        <div>
                            <input
                                type="password"
                                name="password_confirmation"
                                placeholder="Şifre Tekrar"
                                onChange={formik.handleChange}
                                value={formik.values.password_confirmation}
                                className="w-full p-3 border border-gray-300 rounded"
                            />
                            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.password_confirmation}</p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
                    >
                        {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    {isRegister ? 'Zaten bir hesabın var mı?' : 'Hesabın yok mu?'}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-600 font-medium ml-1 hover:underline"
                    >
                        {isRegister ? 'Giriş Yap' : 'Kayıt Ol'}
                    </button>
                </p>
            </div>
        </div>
    );
}