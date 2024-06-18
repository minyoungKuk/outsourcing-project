import supabase from './../config/supabase';

export const register = async ({ email, password, nickname }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      nickname: nickname,
      options: {
        data: {
          displayName: nickname,
        },
      },
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
      .insert([
        { id: user.id, email: email, nickname: nickname, password: password },
      ]);

    if (dbError) {
      throw dbError;
    }

    return insertData;
  } catch (error) {
    console.error('회원가입 에러:', error);
    alert(`Error: ${error.message || 'Unknown error occurred'}`);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('로그인 에러:', error);
    alert(`Error: ${error.message || 'Unknown error occurred'}`);
    throw error;
  }
};
