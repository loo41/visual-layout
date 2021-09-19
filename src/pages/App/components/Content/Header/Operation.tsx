import revoke from 'src/static/img/revoke.png';
import forward from 'src/static/img/forward.png';
import styles from '../index.module.scss';
import { CodeOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { InputNumber, Tooltip } from 'antd';
import { Options } from 'src/pages/App/components/Content/index';
import { PagesService } from 'src/controller';
import Preview from './component/preview';
import Keep from './keep';

const Max_Zoom = 3;
const Min_Zoom = 1;

const Operation: React.FC<{
  options: Options;
  setOptions: (options: Options) => void;
  pagesService: PagesService;
}> = ({ options, setOptions, pagesService }) => {
  return (
    <div className={styles.operation}>
      <div className={styles.code}>
        <Tooltip placement="top" title="代码">
          <CodeOutlined style={{ fontSize: 20 }} />
        </Tooltip>
      </div>
      <div className={styles.eye}>
        <Preview pagesService={pagesService} />
      </div>
      <div className={styles.history}>
        <div
          onClick={() => {
            pagesService.getCurrentPage().backOffHistory();
          }}
        >
          <Tooltip placement="top" title="后退">
            <img src={revoke} alt="" />
          </Tooltip>
        </div>
        <div
          onClick={() => {
            pagesService.getCurrentPage().forwardHistory();
          }}
        >
          <Tooltip placement="top" title="前进">
            <img src={forward} alt="" />
          </Tooltip>
        </div>
      </div>

      <div className={styles.zoom}>
        <div>
          <Tooltip placement="top" title="缩小">
            <ZoomOutOutlined
              style={{
                fontSize: 20,
                color: `${options.zoom === Min_Zoom ? '#bfbfbf' : ''} `,
                cursor: `${options.zoom === Min_Zoom ? 'not-allowed' : 'pointer'}`,
              }}
              onClick={() => {
                if (options.zoom <= Min_Zoom) return;
                setOptions({
                  ...options,
                  zoom: options.zoom - 0.5,
                });
              }}
            />
          </Tooltip>
        </div>
        <InputNumber
          min={1}
          max={3}
          value={options.zoom}
          step={0.5}
          onChange={value => {
            setOptions({
              ...options,
              zoom: value,
            });
          }}
          className={styles.inputNumber}
        />
        <div>
          <Tooltip placement="top" title="放大">
            <ZoomInOutlined
              style={{
                fontSize: 20,
                color: `${options.zoom === Max_Zoom ? '#bfbfbf' : ''} `,
                cursor: `${options.zoom === Max_Zoom ? 'not-allowed' : 'pointer'}`,
              }}
              onClick={() => {
                if (options.zoom >= Max_Zoom) return;
                setOptions({
                  ...options,
                  zoom: options.zoom + 0.5,
                });
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div>
        <Keep />
      </div>
    </div>
  );
};
export default Operation;
