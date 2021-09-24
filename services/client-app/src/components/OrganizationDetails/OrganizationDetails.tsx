import { Organization } from '../../services/organization.service';

interface OrganizationDetailsProps {
  organization?: Organization;
}
const OrganizationDetails = ({ organization }: OrganizationDetailsProps) => {
  return <div>{organization?.name}</div>;
};

export default OrganizationDetails;
