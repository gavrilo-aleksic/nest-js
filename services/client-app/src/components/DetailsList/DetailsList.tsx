import { ListItem, Paper, List } from '@mui/material';

import './DetailsList.css';

interface DetailsListProps {
  items: {
    label?: string;
    value?: string;
  }[];
}

const DetailsList = ({ items }: DetailsListProps) => {
  return (
    <Paper>
      <List className="details-list__wrapper">
        {items.map((item) => (
          <ListItem className="details-list__element-wrapper">
            <span>{item.label}</span>
            <span className="typography-blue">{item.value || '-'}</span>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DetailsList;
