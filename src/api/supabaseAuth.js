import supabase from './../config/supabase';

export const register = async ({
  email,
  password,
  nickname,
  profile_image_url,
}) => {
  console.log('🚀 ~ register parameters:', {
    email,
    password,
    nickname,
    profile_image_url,
  });

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nickname: nickname,
          profile_image_url: profile_image_url,
        },
      },
    });

    if (error) {
      console.error('Sign Up Error:', error);
      return { error: error.message };
    }

    const user = data.user;
    if (!user) {
      throw new Error('User not created. Please try again.');
    }

    const { data: insertData, error: dbError } = await supabase
      .from('user')
      .insert([
        {
          id: user.id,
          email: email,
          password: password,
          nickname: nickname,
          profile_image_url: profile_image_url,
        },
      ]);

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      return { error: dbError.message };
    }

    console.log('Database Insert Data:', insertData);
    return { data: insertData };
  } catch (error) {
    console.error('회원가입 에러:', error);
    return { error: error.message };
  }
};

///

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

//
