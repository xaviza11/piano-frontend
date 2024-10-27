import React, { createContext, useContext, useState, ReactNode } from 'react';
import Alert from '~/components/Alert';

interface AlertContextType {
  showAlert: (message: string, type?: 'info' | 'error' | 'warning' | 'success', dismissible?: boolean) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used inside AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<'info' | 'error' | 'warning' | 'success'>("info");
  const [isAlertDismissible, setIsAlertDismissible] = useState(true);

  const showAlert = (message: string, type: 'info' | 'error' | 'warning' | 'success' = 'info', dismissible: boolean = true) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertDismissible(dismissible);
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {isAlertVisible && (
        <Alert
          message={alertMessage}
          type={alertType}
          dismissible={isAlertDismissible}
          onClose={hideAlert}
        />
      )}
    </AlertContext.Provider>
  );
};
