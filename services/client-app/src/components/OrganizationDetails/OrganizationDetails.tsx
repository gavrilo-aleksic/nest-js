import { Box } from '@mui/system';
import { Organization } from '../../services/organization.service';
import React, { useContext } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { getFormData } from '../../services/form.utils';
import ActionButtons from '../ActionButtons';

import './OrganizationDetails.css';
import { UserContext } from '../../contexts/User.context';
interface OrganizationDetailsValues {
  name: string;
  displayName: string;
  setAsDefaultOrganization?: boolean;
}
interface OrganizationDetailsProps {
  organization?: Organization | null;
  onSubmit: (
    organization: Partial<Organization>,
    setAsDefaultOrganization?: boolean,
  ) => void;
  onCancel: () => void;
}
const OrganizationDetails = React.forwardRef(
  (
    { organization, onSubmit, onCancel }: OrganizationDetailsProps,
    ref: any,
  ) => {
    const { user } = useContext(UserContext);
    return (
      <Box
        component="form"
        onSubmit={(event: any) => {
          event.preventDefault();
          const formData = getFormData<OrganizationDetailsValues>(
            event.currentTarget,
          );
          onSubmit(
            { ...formData, id: organization?.id },
            formData.setAsDefaultOrganization,
          );
        }}
        sx={{ mt: 1 }}
        ref={ref}
        className="organization-details__wrapper"
      >
        <p>
          {organization?.id
            ? organization.name || 'Missing Name'
            : 'New Organization'}
        </p>
        <TextField
          margin="normal"
          required
          label="Name"
          name="name"
          autoFocus
          defaultValue={organization?.name || ''}
        />
        <TextField
          margin="normal"
          name="displayName"
          label="Display Name"
          defaultValue={organization?.displayName || ''}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="setAsDefaultOrganization"
              defaultChecked={
                user?.selectedOrganization?.id === organization?.id
              }
              value={true}
            />
          }
          name="setAsDefaultOrganization"
          label="Set as Default"
        />
        <ActionButtons onCancel={onCancel} />
      </Box>
    );
  },
);

export default OrganizationDetails;
