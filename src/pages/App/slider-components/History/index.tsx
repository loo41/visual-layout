import { PagesContext } from 'src/context';
import { useContext } from 'react';
import styles from './index.module.scss';
import React from 'react';
import { getDoubleTime } from 'src/util';
import { HistoryLog } from 'src/model';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const History: React.FC<{}> = () => {
  const { pagesService } = useContext(PagesContext);

  const page = Object.values(pagesService.getPages()).filter(
    ({ id }) => id === pagesService.currentId,
  )[0];

  const renderHistory = (): React.ReactNode => {
    return page?.history.history
      .slice()
      .filter(_ => _)
      .reverse()
      .map(history => (
        <HistoryList
          history={history}
          key={history.id}
          renderSpanIcon={(id: number) => (
            <span
              onClick={() => {
                page.returnHistory(id);
              }}
            >
              <Tooltip placement="right" title="回退版本">
                <RedoOutlined />
              </Tooltip>
            </span>
          )}
        />
      ));
  };

  const renderFutureHistory = (): React.ReactNode => {
    return page?.history.future
      .slice()
      .filter(_ => _)
      .map(history => (
        <HistoryList
          className={styles.futureHistory}
          history={history}
          key={history.id}
          renderSpanIcon={(id: number) => (
            <span
              onClick={() => {
                page.recoveryHistory(id);
              }}
            >
              <Tooltip placement="right" title="还原版本">
                <UndoOutlined />
              </Tooltip>
            </span>
          )}
        />
      ));
  };

  return (
    <div className={styles.container}>
      {renderFutureHistory()}
      {renderHistory()}
    </div>
  );
};

const HistoryList = ({
  history,
  renderSpanIcon,
  className,
}: {
  history: HistoryLog;
  renderSpanIcon: (id: number) => React.ReactNode;
  className?: string;
}) => {
  const formatTime = (time: Date): React.ReactNode => {
    return `${time.getFullYear()}/${
      time.getMonth() + 1
    }/${time.getDate()}  ${time.getHours()}:${getDoubleTime(
      time.getMinutes(),
    )}:${getDoubleTime(time.getSeconds())}`;
  };

  const { id, time, description } = history;
  return (
    <div className={`${styles.history} ${className}`}>
      <span>{description}</span>
      <span>{formatTime(time)}</span>
      {renderSpanIcon(id)}
    </div>
  );
};

export default History;
