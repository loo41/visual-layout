import { PageService } from 'src/controller';
import BaseAttribute from './base-attribute';
import StyleComponent from './style';

const Attribute: React.FC<{ page: PageService }> = ({ page }) => {
  return (
    <>
      <BaseAttribute page={page} />
      <StyleComponent page={page} />
    </>
  );
};

export default Attribute;
