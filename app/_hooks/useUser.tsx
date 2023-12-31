import { useEffect, useState, createContext, useContext } from "react";
import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react";
import { UserDetailsType } from "../_types/UserDetails";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetailsType | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").eq('email', user?.email).single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsloadingData(true);
      Promise.resolve(getUserDetails())
        .then((userDetailsPromise) => {
          setUserDetails(userDetailsPromise.data as UserDetailsType);
        })
        .catch((error) => {
          // Handle any errors here
        })
        .finally(() => {
          setIsloadingData(false);
        });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
