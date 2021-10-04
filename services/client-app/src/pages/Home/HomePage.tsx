import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Paper, Modal, Stack, Alert } from '@mui/material';

import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Attribute, fetchAttributes } from '../../services/attributes.service';
import {
  createOrganization,
  Organization,
  updateOrganization,
} from '../../services/organization.service';

import './HomePage.css';
import { UserContext } from '../../contexts/User.context';
import AppTable from '../../components/Table/Table';
import OrganizationDetails from '../../components/OrganizationDetails/OrganizationDetails';
import SideMenu from '../../components/SideMenu/SideMenu';
import { OrganizationContext } from '../../contexts/Organization.context';
import api from '../../services/api';
import AlertDialog from '../../components/AlertDialog';
import { logout } from '../../services/auth.service';

const HomePage = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const { addOrganization, organizations, editOrganization } =
    useContext(OrganizationContext);
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(user?.selectedOrganization || null);

  useEffect(() => {
    if (user?.selectedOrganization) {
      fetchAttributes().then((result) => setAttributes(result));
    }
  }, [user?.selectedOrganization]);
  console.log(user);
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <SideMenu />
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paper
                variant="elevation"
                elevation={2}
                className="app-title-banner"
              >
                Organization Data
              </Paper>
              <IconButton
                onClick={() => {
                  setModalOpen(true);
                  setSelectedOrganization(null);
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
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
            {!selectedOrganization ? (
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
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <OrganizationDetails
          organization={selectedOrganization}
          onSubmit={async (values, setAsDefault) => {
            let orgId = values.id;
            if (!values.id) {
              const newOrganization = await createOrganization(values);
              addOrganization(newOrganization);
              orgId = newOrganization.id;
            } else {
              const updatedOrganization = await updateOrganization(values);
              editOrganization(updatedOrganization);
            }
            if (
              setAsDefault &&
              orgId &&
              user?.selectedOrganization?.id !== orgId
            ) {
              await api.updateProfileOrganization(orgId);
              setLogoutAlert(true);
            }
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
      <AlertDialog
        isOpen={logoutAlert}
        title="Logout"
        description="Once default organization is changed, you will need to re-login"
        onOk={() => {
          setLogoutAlert(false);
          logout();
        }}
      />
    </>
  );
};

export default HomePage;
