import { List, ListItem } from '@material-ui/core';
import { Paper, ListItemButton, ListItemText, Modal } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Attribute, fetchAttributes } from '../../services/attributes.service';
import {
  fetchOrganizations,
  Organization,
} from '../../services/organization.service';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AodIcon from '@mui/icons-material/Aod';

import './HomePage.css';
import { UserContext } from '../../contexts/User.context';
import AppTable from '../../components/Table/Table';
import OrganizationDetails from '../../components/OrganizationDetails/OrganizationDetails';

const HomePage = () => {
  const { push } = useHistory();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    Organization | undefined
  >();
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchOrganizations().then((result) => setOrganizations(result));
    fetchAttributes().then((result) => setAttributes(result));
  }, []);
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <List className="home-page__menu">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
                <ListItemText primary="Profile" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => push('/organizations')}>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
                <ListItemText primary="Organizations" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AodIcon />
                <ListItemText primary="Attributes" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            padding: '50px',
            flexWrap: 'wrap',
            backgroundColor: '#f5f5f5',
          }}
        >
          <div>
            <Paper
              variant="elevation"
              elevation={2}
              className="app-title-banner"
            >
              Organization Data
            </Paper>
            <AppTable
              onClick={(row) => {
                setSelectedOrganization(row);
                setModalOpen(true);
              }}
              style={{ width: '600px' }}
              columns={[
                { label: 'ID', value: 'id' },
                { label: 'Name', value: 'name' },
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
              rows={organizations}
            />
          </div>
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
            <Paper
              variant="elevation"
              elevation={2}
              className="app-title-banner"
            >
              Attributes Data
            </Paper>
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
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <OrganizationDetails organization={selectedOrganization} />
      </Modal>
    </>
  );
};

export default HomePage;
