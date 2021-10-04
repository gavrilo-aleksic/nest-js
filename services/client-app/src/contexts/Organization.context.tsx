import { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchOrganizations,
  Organization,
} from '../services/organization.service';
import { UserContext } from './User.context';

interface OrganizationContextValues {
  organizations: Organization[];
  addOrganization: (organization: Organization) => void;
  editOrganization: (Organization: Organization) => void;
}

const defaultValue: OrganizationContextValues = {
  organizations: [],
  addOrganization: (organization: Organization) => {},
  editOrganization: (Organization: Organization) => {},
};

export const OrganizationContext = createContext(defaultValue);

const OrganizationProvider = ({ children }: any) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchOrganizations().then((result) => setOrganizations(result));
  }, [user]);

  const addOrganization = (organization: Organization) => {
    setOrganizations([organization, ...organizations]);
  };

  const editOrganization = (organization: Organization) => {
    let existingOrganization = organizations.find(
      (org) => org.id === organization.id,
    );
    if (existingOrganization) {
      Object.assign(existingOrganization, organization);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        addOrganization,
        editOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationProvider;
