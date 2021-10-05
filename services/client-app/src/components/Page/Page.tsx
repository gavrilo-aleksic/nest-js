import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import Header from '../Header/Header';

import './Page.css';

interface PageProps {
  title: string;
  children?: IReactChildren;
}
const Page = ({ children, title }: PageProps) => {
  const { push } = useHistory();
  return (
    <div className="page__wrapper">
      <Header title={title} />
      <div className="page__inner-wrapper">
        <div className="page__navigation">
          <Button variant="outlined" onClick={() => push('/home')}>
            Home
          </Button>
          <Button variant="outlined" onClick={() => push('/organizations')}>
            Organizations
          </Button>
          <Button variant="outlined" onClick={() => push('/attributes')}>
            Attributes
          </Button>
        </div>
        <div className="page__inner-content">{children}</div>
      </div>
    </div>
  );
};

export default Page;
