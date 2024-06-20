import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { login } from '../../api/supabaseAuth';
import Button from '../../common/components/Button';
import { useModal } from '../../context/modal.context';
import useAuthStore from '../../zustand/authStore';
import SignUpPage from './SignUpPage';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [errors, setErrors] = useState({});
  const modal = useModal();
  const { login: setLogin } = useAuthStore();

  const validateInputs = ({ email, password }) => {
    const showErrors = {};
    if (email.length < 6 || email.length > 30) {
      showErrors.email = '이메일은 6글자 이상 30글자 이하여야 합니다';
    }
    if (password.length < 6 || password.length > 15) {
      showErrors.password = '비밀번호는 6~15글자여야 합니다.';
    }

    return showErrors;
  };

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (e) => {
      if (e.message === 'Invalid login credentials') {
        modal.open({
          type: 'alert',
          content: '이메일 혹은 패스워드가 다릅니다',
          onConfirm: () => {
            modal.close();
          },
        });
        setErrors({ general: '이메일 또는 비밀번호가 잘못되었습니다.' });
      }
    },
    onSuccess: async () => {
      await setLogin(email, password);
      modal.open({
        type: 'alert',
        content: '로그인이 성공했습니다.',
        onConfirm: () => {
          modal.close();
        },
      });
    },
  });

  const openSignUpModal = () => {
    modal.open({
      type: 'signUp',
      content: <SignUpPage />,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const showErrors = validateInputs({
          email,
          password,
        });

        if (Object.keys(showErrors).length > 0) {
          setErrors(showErrors);
          return;
        }
        mutate({ email, password });
      }}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg z-9999  "
    >
      <span className="text-3xl text-center pb-10 font-bold">로그인</span>
      <input
        className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="이메일주소"
        onChange={(e) => setEmail(e.target.value)}
      />{' '}
      {errors.email && (
        <label className="text-red-500 text-center text-sm flow-root">
          {errors.email}
        </label>
      )}
      <input
        className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassWord(e.target.value)}
      />{' '}
      {errors.password && (
        <label className="text-red-500 text-red-500 text-center text-sm  flow-root">
          {errors.password}
        </label>
      )}
      <Button size="large" color="primary" type="submit">
        로그인
      </Button>
      <Button
        size="large"
        color="primary"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          openSignUpModal();
        }}
      >
        회원가입
      </Button>
      <img src="/images/logo2.png" alt="Logo" className="w-auto h-auto " />
    </form>
  );
};

export default SignInPage;
