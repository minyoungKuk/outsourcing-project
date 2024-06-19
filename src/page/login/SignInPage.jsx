// import { login } from '../../lib/api/auth';
// import { loginAuth } from '../../redux/slices/authSlice';

import { useState } from 'react';
import { login } from '../../api/supabaseAuth';
import { useModal } from '../../context/modal.context';
import SignUpPage from './SignUpPage';

const SignInPage = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const modal = useModal();

  const openSignUpModal = () => {
    modal.open({
      type: 'signUp',
      content: <SignUpPage />,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('id', email);
    console.log('password:', password);
    const response = await login({ email: email, password: password });
    console.log('로그인 api 응답값:', response);

    if (response) {
      confirm('로그인성공');
      modal.close();
    } else {
      alert('무언가 잘못됨.');
    }

    //   if (response) {
    //     dispatch(loginAuth(response.accessToken)); // 로그인 성공 시 엑세스 토큰을 저장
    //     alert('로그인 성공');
    //     navigate('/home');
    //   } else {
    //     alert('로그인 실패. 다시 시도해주세요.');
    //   }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <input
        type="email"
        placeholder="이메일주소"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <button onClick={onSubmit}>로그인</button>
      {/* <button onClick={() => navigate('/signUp')}>회원가입</button> */}
      <button onClick={openSignUpModal}>회원가입</button>
    </form>
  );
};

export default SignInPage;
