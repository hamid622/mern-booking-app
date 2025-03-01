import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";

import { useQuery } from "@tanstack/react-query";

interface MessageProps {
  message: string;
  type: "SUCCESS" | "ERROR";
}
interface AppContextProps {
  showToast: (message: MessageProps) => void;
  isLoggedIn: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<MessageProps | undefined>(undefined);

  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContextProps;
};
