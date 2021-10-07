import { ListItem, Paper, List } from '@mui/material';
import { isDefined } from '../../services/form.utils';

import './DetailsList.css';

interface DetailsListProps {
  items: {
    label?: string;
    value?: string | number | boolean;
  }[];
}

const DetailsList = ({ items }: DetailsListProps) => {
  return (
    <Paper>
      <List className="details-list__wrapper">
        {items.map((item, key) => (
          <ListItem className="details-list__element-wrapper" key={key}>
            <span>{item.label}</span>
            <span className="typography-blue">
              {isDefined(item.value) ? item.value.toString() : '-'}
            </span>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DetailsList;
