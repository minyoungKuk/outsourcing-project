import supabase from './../config/supabase';

export const register = async ({ email, password, nickname }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      nickname: nickname,
    });

    if (error) {
      throw error;
    }

    const user = data.user;
    if (!user) {
      throw new Error('User not created. Please try again.');
    }

    const { data: insertData, error: dbError } = await supabase
      .from('user')
      .insert([{ id: user.id, email: email, nickname: nickname }]);

    if (dbError) {
      throw dbError;
    }

    return insertData;
  } catch (error) {
    console.error('회원가입 에러:', error);
    alert(error.message);
  }
};
