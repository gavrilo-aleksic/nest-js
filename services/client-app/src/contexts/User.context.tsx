import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/auth.service';
import { Organization } from '../services/organization.service';

export type UserProfile = {
  username: string;
  id: string;
  selectedOrganization: Organization | null;
} | null;

interface UserContextValues {
  user: UserProfile;
  setUser: (user: any) => void;
}

const defaultValue: UserContextValues = {
  user: null,
  setUser: () => {},
};

export const UserContext = React.createContext(defaultValue);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserProfile>(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) {
      fetchUserProfile().then((res) => {
        setUser(res);
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
