import { AppContext } from 'src/context';
import { useContext } from 'react';
import styles from './index.module.scss';
import React from 'react';
import { formatTime } from 'src/util';
import { HistoryLog } from 'src/model';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const History: React.FC<{}> = () => {
  const { appService } = useContext(AppContext);

  const page = Object.values(appService.project.getPages()).filter(
    ({ id }) => id === appService.project.currentId,
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
      .reverse()
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
