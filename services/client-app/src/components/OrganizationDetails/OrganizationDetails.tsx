import { Box } from '@mui/system';
import { Organization } from '../../services/organization.service';
import React from 'react';

interface OrganizationDetailsProps {
  organization?: Organization;
}
const OrganizationDetails = React.forwardRef(
  ({ organization }: OrganizationDetailsProps, ref: any) => {
    return <Box>{organization?.name}</Box>;
  },
);

export default OrganizationDetails;
