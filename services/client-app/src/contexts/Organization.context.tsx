import { createContext, useEffect, useState } from 'react';
import {
  fetchOrganizations,
  Organization,
} from '../services/organization.service';

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

  useEffect(() => {
    fetchOrganizations().then((result) => setOrganizations(result));
  }, []);

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
