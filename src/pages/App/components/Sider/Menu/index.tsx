import styles from '../index.module.scss';
import { Menu } from 'src/pages/App/config';

const MenuComponent: React.FC<{ onChange: (id: string) => void; menus: Menu[] }> = ({
  onChange,
  menus,
}) => {
  return (
    <div className={styles.menu}>
      {menus.map(({ id, icon }) => (
        <div key={id} onClick={() => onChange(id)}>
          {icon}
        </div>
      ))}
    </div>
  );
};

export default MenuComponent;
