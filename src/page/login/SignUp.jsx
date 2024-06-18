import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from './../../api/supabaseAuth';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [nickName, setNickName] = useState('');
  // const [img, setImg] = useState("");

  const onAddUser = async () => {
    if (email.length < 4 || email.length > 30) {
      alert('아이디는 4글자 이상이어야 합니다');
      return;
    } else if (password.length < 4 || password.length > 15) {
      alert('비밀번호는 6~15글자여야 합니다.');
      return;
    } else if (nickName.length < 1 || nickName.length > 10) {
      alert('닉네임은 1~10글자여야 합니다.');
      return;
    }

    const response = await register({
      email: email,
      password: password,
      nickname: nickName,
    });
    console.log('회원가입 api 응답 :', response);
    if (response) {
      confirm('회원가입이 완료 되었습니다!');
      navigate('/');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddUser();
  };

  return (
    <StSignInForm onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="로그인아이디(4~30글자 이내)"
        minLength={4}
        maxLength={30}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호(6~15글자 이내)"
        minLength={6}
        maxLength={15}
        required
        onChange={(e) => setPassWord(e.target.value)}
      />
      <input
        type="text"
        placeholder="닉네임(1~10글자 이내)"
        minLength={1}
        maxLength={10}
        required
        onChange={(e) => setNickName(e.target.value)}
      />
      <StButton>회원가입</StButton>
      <StLink to="/">로그인</StLink>
    </StSignInForm>
  );
};

export default SignUpPage;
