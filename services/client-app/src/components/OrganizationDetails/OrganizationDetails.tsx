import { Box } from '@mui/system';
import { Organization } from '../../services/organization.service';

interface OrganizationDetailsProps {
  organization?: Organization;
}
const OrganizationDetails = ({ organization }: OrganizationDetailsProps) => {
  return <Box>{organization?.name}</Box>;
};

export default OrganizationDetails;
