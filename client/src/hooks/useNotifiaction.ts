import { useState, useCallback } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

const useNotification = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const addNotification = useCallback(
    (message: string, type: 'info' | 'success' | 'error' = 'info') => {
      const newNotification: Notification = {
        message,
        type,
        id: Date.now(), 
      };
      setNotification(newNotification);
      setTimeout(() => {
        setNotification(null); 
      }, 3000);
    },
    []
  );

  const removeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return { notification, addNotification, removeNotification };
};

export default useNotification;