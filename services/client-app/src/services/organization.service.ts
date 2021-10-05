import api from './api';

export type Organization = {
  id: number;
  name: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const fetchOrganizations = () => {
  return api.getOrganizations().then((res) =>
    res.map((organization: Organization) => ({
      id: organization.id,
      name: organization.name,
      displayName: organization.displayName,
      createdAt: new Date(organization.createdAt),
      updatedAt: new Date(organization.updatedAt),
    })),
  );
};

export const createOrganization = (organization: Partial<Organization>) => {
  return api.createOrganization(organization).then((res) => {
    const mappedOrganization: Organization = {
      id: res.id,
      name: res.name,
      displayName: res.displayName,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
    };
    return mappedOrganization;
  });
};

export const updateOrganization = (organization: Partial<Organization>) => {
  return api.updateOrganization(organization).then((res) => {
    const mappedOrganization: Organization = {
      id: res.id,
      name: res.name,
      displayName: res.displayName,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
    };
    return mappedOrganization;
  });
};

export const deleteOrganization = (organizationId: number) => {
  return api.deleteOrganization(organizationId).then((res) => {
    console.log(res);
  });
};
