import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { login } from '../../api/supabaseAuth';
import { useModal } from '../../context/modal.context';
import SignUpPage from './SignUpPage';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [errors, setErrors] = useState({});
  const modal = useModal();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (e) => onSubmit({ e, email, password }),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      alert('success');
    },
  });

  const openSignUpModal = () => {
    alert('open signup');
    modal.open({
      type: 'signUp',
      content: <SignUpPage />,
    });
  };

  const onSubmit = async ({ e, email, password }) => {
    e.preventDefault();
    console.log('id', email);
    console.log('password:', password);
    const response = await login({ email: email, password: password });
    console.log('로그인 api 응답값:', response);

    if (response) {
      modal.open({
        type: 'alert',
        content: '로그인 성공',
        onConfirm: () => {
          modal.close();
        },
      });
    } else {
      alert('무언가 잘못됨.');
    }
  };

  return (
    <form
      onSubmit={async (e) => await mutateAsync({ e, email, password })}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg "
    >
      <span className="text-3xl text-center pb-10">로그인</span>
      <input
        className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="이메일주소"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        onClick={onSubmit}
      >
        로그인
      </button>
      {/* <button onClick={() => navigate('/signUp')}>회원가입</button> */}
      <button
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        onClick={openSignUpModal}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignInPage;
