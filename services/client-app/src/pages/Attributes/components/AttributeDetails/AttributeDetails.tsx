import { Box } from '@mui/system';
import {
  Attribute,
  AttributeTypeEnum,
  AttributeTypes,
} from '../../../../services/attribute.service';
import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from '@mui/material';
import { getFormData } from '../../../../services/form.utils';
import ActionButtons from '../../../../components/ActionButtons';
import FormControl from '@mui/material/FormControl';

import './AttributeDetails.css';

interface AttributeDetailsValues {
  id?: number;
  name: string;
  displayName: string;
  required?: boolean;
  type: AttributeTypeEnum;
}

interface AttributeDetailsProps {
  attribute?: Attribute | null;
  onSubmit: (attribute: Partial<AttributeDetailsValues>) => void;
  onCancel: () => void;
}

const AttributeDetails = React.forwardRef(
  ({ attribute, onSubmit, onCancel }: AttributeDetailsProps, ref: any) => {
    return (
      <Box
        component="form"
        onSubmit={(event: any) => {
          event.preventDefault();
          const formData = getFormData<AttributeDetailsValues>(
            event.currentTarget,
          );
          onSubmit({
            ...formData,
            id: attribute?.id,
            required: Boolean(formData.required),
          });
        }}
        sx={{ mt: 1 }}
        ref={ref}
        className="attribute-details__wrapper"
      >
        <p>
          {attribute?.id ? attribute.name || 'Missing Name' : 'New Attribute'}
        </p>
        <TextField
          margin="normal"
          required
          label="Name"
          name="name"
          autoFocus
          defaultValue={attribute?.name || ''}
        />
        <TextField
          margin="normal"
          label="Display Name"
          name="displayName"
          autoFocus
          defaultValue={attribute?.displayName || ''}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select name="type" label="Type" defaultValue={attribute?.type || ''}>
            {AttributeTypes.map((type) => (
              <MenuItem value={type} key={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              name="required"
              defaultChecked={attribute?.required}
              value={true}
            />
          }
          name="required"
          label="Is required?"
        />
        <ActionButtons onCancel={onCancel} />
      </Box>
    );
  },
);

export default AttributeDetails;
