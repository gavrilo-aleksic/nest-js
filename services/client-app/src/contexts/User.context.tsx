import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/auth.service';
import { Organization } from '../services/organization.service';
import { io } from 'socket.io-client';

export type UserProfile = {
  username: string;
  id: string;
  selectedOrganization: Organization | null;
} | null;

interface UserContextValues {
  user: UserProfile;
  setUser: (user: any) => void;
  messages: { statusCode: string; message: string }[];
}

const defaultValue: UserContextValues = {
  user: null,
  setUser: () => {},
  messages: [],
};

export const UserContext = React.createContext(defaultValue);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserProfile>(null);
  const [messages, setMessages] = useState<
    { statusCode: string; message: string }[]
  >([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) {
      fetchUserProfile().then((res) => {
        setUser(res);
        const socket = io('http://localhost:3000', {
          extraHeaders: { authorization: jwt },
        });
        socket.connect();
        socket.on('events', (message) => {
          setMessages((oldMessages) => [JSON.parse(message), ...oldMessages]);
        });
      });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        messages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
