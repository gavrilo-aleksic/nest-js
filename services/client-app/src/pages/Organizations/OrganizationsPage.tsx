import { Modal, Button, AlertColor } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Page from '../../components/Page/Page';
import AppTable from '../../components/Table/Table';
import { useContext, useState } from 'react';
import { OrganizationContext } from '../../contexts/Organization.context';
import {
  createOrganization,
  deleteOrganization,
  Organization,
  updateOrganization,
} from '../../services/organization.service';
import { UserContext } from '../../contexts/User.context';
import OrganizationDetails from '../../components/OrganizationDetails/OrganizationDetails';
import api from '../../services/api';
import AlertDialog from '../../components/AlertDialog';
import { logout } from '../../services/auth.service';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsList from '../../components/DetailsList/DetailsList';
import Toast from '../../components/Toast';

import './OrganizationsPage.css';

const OrganizationsPage = () => {
  const { user } = useContext(UserContext);
  const {
    addOrganization,
    organizations,
    editOrganization,
    removeOrganization,
  } = useContext(OrganizationContext);

  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(user?.selectedOrganization || null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<
    'CONFIRM_DEFAULT' | 'CONFIRM_DELETE' | null
  >(null);
  const [toast, setToast] = useState<{
    text: string;
    variant: AlertColor;
  } | null>(null);

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
      setAlertType('CONFIRM_DEFAULT');
    }
    setModalOpen(false);
  };

  return (
    <Page title="Organizations">
      <Toast
        text={toast?.text || ''}
        show={!!toast}
        severity={toast?.variant || 'success'}
        onClose={() => setToast(null)}
      />
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
          <Button
            endIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={() => {
              setAlertType('CONFIRM_DELETE');
            }}
          >
            Delete
          </Button>
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
        isOpen={alertType === 'CONFIRM_DEFAULT'}
        title="Logout"
        description="Once default organization is changed, you will need to re-login"
        onOk={() => {
          setAlertType(null);
          logout();
        }}
      />
      <AlertDialog
        isOpen={alertType === 'CONFIRM_DELETE'}
        title="Delete"
        description="Are you sure you want to delete this organization?"
        type="important"
        onOk={() => {
          if (!selectedOrganization?.id) return;
          deleteOrganization(selectedOrganization.id)
            .then((res) => {
              setAlertType(null);
              setToast({
                variant: 'success',
                text: `Organization [${selectedOrganization?.name}] successfully deleted`,
              });
              removeOrganization(selectedOrganization.id);
            })
            .catch((error: IApiError) => {
              setToast({ variant: 'error', text: error.message });
              setAlertType(null);
            })
            .finally(() => {
              setSelectedOrganization(null);
            });
        }}
        onClose={() => setAlertType(null)}
      />
    </Page>
  );
};

export default OrganizationsPage;
