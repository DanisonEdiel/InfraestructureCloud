import { ref } from 'vue'
import { api } from '../api/axios';
import { useMutation } from '@tanstack/vue-query';

const savePost = async (formData: FormData): Promise<void> => {
  const { data } = await api.post('/core/post', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data;
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
