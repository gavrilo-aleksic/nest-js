import { Box } from '@mui/system';
import { Organization } from '../../services/organization.service';
import React from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { getFormData } from '../../services/form.utils';
import ActionButtons from '../ActionButtons';

interface OrganizationDetailsProps {
  organization?: Organization | null;
  onSubmit: (organization: Partial<Organization>) => void;
  onCancel: () => void;
}
const OrganizationDetails = React.forwardRef(
  (
    { organization, onSubmit, onCancel }: OrganizationDetailsProps,
    ref: any,
  ) => {
    return (
      <Box
        component="form"
        onSubmit={(event: any) => {
          event.preventDefault();
          const formData = getFormData<{ name: string; displayName: string }>(
            event.currentTarget,
          );
          onSubmit({ ...formData, id: organization?.id });
        }}
        sx={{ mt: 1 }}
        ref={ref}
        style={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '24',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '20px',
          width: '500px',
        }}
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
        <ActionButtons onCancel={onCancel} />
      </Box>
    );
  },
);

export default OrganizationDetails;
