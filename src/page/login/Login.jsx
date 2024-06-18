import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../lib/api/auth';
import { loginAuth } from '../../redux/slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logInID, setLogInId] = useState('');
  const [password, setPassWord] = useState('');

  const handleLogIn = async () => {
    console.log('id', logInID);
    console.log('password:', password);
    const response = await login({ id: logInID, password: password });
    console.log('로그인 api 응답값:', response);

    if (response) {
      dispatch(loginAuth(response.accessToken)); // 로그인 성공 시 엑세스 토큰을 저장
      alert('로그인 성공');
      navigate('/home');
    } else {
      alert('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <StLoginForm>
      <input
        type="text"
        placeholder="로그인아이디"
        onChange={(e) => setLogInId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <button onClick={handleLogIn}>로그인</button>
      <button onClick={() => navigate('/signUp')}>회원가입</button>
    </StLoginForm>
  );
};

export default LoginPage;
