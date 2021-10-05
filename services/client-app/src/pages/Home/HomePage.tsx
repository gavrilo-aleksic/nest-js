import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Paper, Stack, Alert } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Attribute, fetchAttributes } from '../../services/attributes.service';
import { UserContext } from '../../contexts/User.context';
import AppTable from '../../components/Table/Table';
import Page from '../../components/Page/Page';
import { OrganizationContext } from '../../contexts/Organization.context';

import './HomePage.css';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const { organizations } = useContext(OrganizationContext);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  useEffect(() => {
    if (user?.selectedOrganization) {
      fetchAttributes().then((result) => setAttributes(result));
    }
  }, [user?.selectedOrganization]);

  return (
    <>
      <Page title="Home">
        <Paper>
          <List className="home-page__statistics">
            <ListItem>
              <span>Selected Organization:</span>
              <span className="typography-blue">
                {user?.selectedOrganization?.name}
              </span>
            </ListItem>
            <ListItem>
              <span>Number of Organizations:</span>
              <span className="typography-blue">{organizations.length}</span>
            </ListItem>
            <ListItem>
              <span>Number of Attributes:</span>
              <span className="typography-blue">{attributes.length}</span>
            </ListItem>
            <ListItem>
              <span>Number of Entity Types:</span>
              <span className="typography-blue">0</span>
            </ListItem>
          </List>
        </Paper>
        <div>
          {!user?.selectedOrganization ? (
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Alert severity="error">Missing selected organization!</Alert>
            </Stack>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paper
                variant="elevation"
                elevation={2}
                className="app-title-banner"
              >
                Attributes Data
              </Paper>
              <IconButton>
                <AddIcon />
              </IconButton>
            </div>
          )}
          <AppTable
            style={{ width: '100%' }}
            columns={[
              { label: 'ID', value: 'id' },
              { label: 'Name', value: 'name' },
              { label: 'Type', value: 'type' },
              {
                label: 'Required',
                value: 'required',
                transform: (value) => value.toString(),
              },
              {
                label: 'Created At',
                value: 'createdAt',
                transform: (value) => value.toLocaleDateString(),
              },
              {
                label: 'Updated At',
                value: 'updatedAt',
                transform: (value) => value.toLocaleDateString(),
              },
            ]}
            rows={attributes}
          />
        </div>
      </Page>
    </>
  );
};

export default HomePage;
