import { api } from '@/api/axios';
import { useMutation } from '@tanstack/vue-query';


const savePost = async (fd: FormData): Promise<void> => {
  const { data } = await api.post('/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data
}

const usePostMutations = () => {
  const savePostMutation = useMutation({
    mutationFn: savePost
  });
  return {
    savePostMutation,

  };
};

export default usePostMutations;
