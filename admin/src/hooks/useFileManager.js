import { useCallback } from 'react';
import { useCreateFileMutation } from '../apis/adminsApi';

export const useFileManager = () => {
  const [createFile] = useCreateFileMutation();

  const createNewFile = useCallback(async (filepath, content = '') => {
    try {
      await createFile({ filepath, content }).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [createFile]);

  return {
    createNewFile,
  };
};