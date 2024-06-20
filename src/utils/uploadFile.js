import supabase from '../config/supabase';

const uploadFile = async (file, bucket) => {
  try {
    const filePath = generateFilePath(file.name);
    // 파일 업로드
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        // 파일 캐시타임 30분 & 중복 금지
        cacheControl: '1800',
        upsert: false,
      });

    if (uploadError) {
      console.log('업로드 오류', uploadError);
      throw uploadError;
    }

    const publicUrlResponse = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlResponse.data.publicUrl;

    return publicUrl;
  } catch (error) {
    console.log('파일 업로드에 실패했습니다', error.message);
    return null;
  }
};

const generateFilePath = (fileName) => {
  const timestamp = new Date().getTime();
  const encodedeFileName = encodeURIComponent(`${timestamp}-${fileName}`);
  return encodedeFileName;
};

export default uploadFile;
