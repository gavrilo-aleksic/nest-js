import api from './api';

export type Organization = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const fetchOrganizations = () => {
  return api.getOrganizations().then((res) =>
    res.map((organization: Organization) => ({
      id: organization.id,
      name: organization.name,
      createdAt: new Date(organization.createdAt),
      updatedAt: new Date(organization.updatedAt),
    })),
  );
};
