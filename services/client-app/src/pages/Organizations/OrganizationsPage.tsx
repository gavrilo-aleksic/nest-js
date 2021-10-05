import { Modal, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Page from '../../components/Page/Page';
import AppTable from '../../components/Table/Table';
import { useContext, useState } from 'react';
import { OrganizationContext } from '../../contexts/Organization.context';
import {
  createOrganization,
  Organization,
  updateOrganization,
} from '../../services/organization.service';
import { UserContext } from '../../contexts/User.context';
import OrganizationDetails from '../../components/OrganizationDetails/OrganizationDetails';
import api from '../../services/api';
import AlertDialog from '../../components/AlertDialog';
import { logout } from '../../services/auth.service';

import './OrganizationsPage.css';
import DetailsList from '../../components/DetailsList/DetailsList';

const OrganizationsPage = () => {
  const { user } = useContext(UserContext);

  const { addOrganization, organizations, editOrganization } =
    useContext(OrganizationContext);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(user?.selectedOrganization || null);
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);

  const handleSubmitOrganization = async (
    values: Partial<Organization>,
    setAsDefault?: boolean,
  ) => {
    let orgId = values.id;
    if (!values.id) {
      const newOrganization = await createOrganization(values);
      addOrganization(newOrganization);
      orgId = newOrganization.id;
    } else {
      const updatedOrganization = await updateOrganization(values);
      editOrganization(updatedOrganization);
    }
    if (setAsDefault && orgId && user?.selectedOrganization?.id !== orgId) {
      await api.updateProfileOrganization(orgId);
      setLogoutAlert(true);
    }
    setModalOpen(false);
  };

  return (
    <Page title="Organizations">
      <div className="organization-page__wrapper">
        <AppTable
          onClick={(row) => {
            setSelectedOrganization(row);
            setModalOpen(true);
          }}
          onSingleClick={(row) => setSelectedOrganization(row)}
          style={{ width: '50%' }}
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
        <div className="organization-page__side-wrapper">
          <Button
            endIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              setModalOpen(true);
              setSelectedOrganization(null);
            }}
          >
            Add New
          </Button>
          <DetailsList
            items={[
              {
                label: 'ID',
                value: selectedOrganization?.id,
              },
              { label: 'Name', value: selectedOrganization?.name },
              {
                label: 'Display Name',
                value: selectedOrganization?.displayName,
              },
            ]}
          />
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <OrganizationDetails
          organization={selectedOrganization}
          onSubmit={handleSubmitOrganization}
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
    </Page>
  );
};

export default OrganizationsPage;
