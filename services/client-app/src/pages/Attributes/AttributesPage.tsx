import { Modal, Button, AlertColor } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Page from '../../components/Page/Page';
import AppTable from '../../components/Table/Table';
import { useContext, useState } from 'react';
import {
  createAttribute,
  deleteAttribute,
  Attribute,
  updateAttribute,
} from '../../services/attribute.service';
import { UserContext } from '../../contexts/User.context';
import AlertDialog from '../../components/AlertDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsList from '../../components/DetailsList/DetailsList';
import Toast from '../../components/Toast';
import { AttributeContext } from '../../contexts/Attribute.context';

import './AttributesPage.css';
import AttributeDetails from './components/AttributeDetails/AttributeDetails';

const AttributesPage = () => {
  const { user } = useContext(UserContext);
  const { addAttribute, attributes, editAttribute, removeAttribute } =
    useContext(AttributeContext);

  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<
    'CONFIRM_DEFAULT' | 'CONFIRM_DELETE' | null
  >(null);
  const [toast, setToast] = useState<{
    text: string;
    variant: AlertColor;
  } | null>(null);

  const handleSubmitAttribute = async (values: Partial<Attribute>) => {
    let attributeId = values.id;
    if (!values.id) {
      const newAttribute = await createAttribute(values);
      addAttribute(newAttribute);
      attributeId = newAttribute.id;
      setToast({
        variant: 'success',
        text: `Attribute [${newAttribute?.name}] successfully created`,
      });
    } else {
      const updatedAttribute = await updateAttribute(values);
      editAttribute(updatedAttribute);
      setToast({
        variant: 'success',
        text: `Attribute [${updatedAttribute?.name}] successfully edited`,
      });
    }
    setModalOpen(false);
  };

  return (
    <Page title="Attributes">
      <Toast
        text={toast?.text || ''}
        show={!!toast}
        severity={toast?.variant || 'success'}
        onClose={() => setToast(null)}
      />
      <div className="attribute-page__wrapper">
        <AppTable
          onClick={(row) => {
            setSelectedAttribute(row);
            setModalOpen(true);
          }}
          onSingleClick={(row) => setSelectedAttribute(row)}
          style={{ width: '50%' }}
          columns={[
            { label: 'ID', value: 'id' },
            { label: 'Name', value: 'name' },
            { label: 'Type', value: 'type' },
            { label: 'Required', value: 'required' },
            {
              label: 'Updated At',
              value: 'updatedAt',
              transform: (value) => value.toLocaleDateString(),
            },
          ]}
          rows={attributes}
        />
        <div className="attribute-page__side-wrapper">
          <Button
            endIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              setModalOpen(true);
              setSelectedAttribute(null);
            }}
          >
            Add New
          </Button>
          <DetailsList
            items={[
              {
                label: 'ID',
                value: selectedAttribute?.id,
              },
              { label: 'Name', value: selectedAttribute?.name },
              {
                label: 'Type',
                value: selectedAttribute?.type,
              },
              {
                label: 'Required',
                value: selectedAttribute?.required,
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
        <AttributeDetails
          attribute={selectedAttribute}
          onSubmit={handleSubmitAttribute}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
      <AlertDialog
        isOpen={alertType === 'CONFIRM_DELETE'}
        title="Delete"
        description="Are you sure you want to delete this attribute?"
        type="important"
        onOk={() => {
          if (!selectedAttribute?.id) return;
          deleteAttribute(selectedAttribute.id)
            .then((res) => {
              setAlertType(null);
              setToast({
                variant: 'success',
                text: `Attribute [${selectedAttribute?.name}] successfully deleted`,
              });
              removeAttribute(selectedAttribute.id);
            })
            .catch((error: IApiError) => {
              setToast({ variant: 'error', text: error.message });
              setAlertType(null);
            })
            .finally(() => {
              setSelectedAttribute(null);
            });
        }}
        onClose={() => setAlertType(null)}
      />
    </Page>
  );
};

export default AttributesPage;
