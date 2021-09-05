import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.scss';

const Collapse: React.FC<{ header?: React.ReactNode }> = ({ header, children }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <div className={styles.header}>
        <div onClick={() => setVisible(!visible)} className={styles.icon}>
          {visible ? <DownCircleOutlined /> : <UpCircleOutlined />}
        </div>
        <div className={styles.content}>{header}</div>
      </div>
      <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>
    </div>
  );
};

export default Collapse;
