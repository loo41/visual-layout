import {
  ClearOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { CssProps } from '../../config';
import styles from './index.module.scss';
import FlexStart from './img/flex-start.png';
import FlexEnd from './img/flex-end.png';
import center from './img/item-center.png';
import SpaceBetween from './img/space-between.png';
import SpaceAround from './img/space-around.png';
import ItemStart from './img/item-start.png';
import ItemEnd from './img/item-end.png';
import baseline from './img/baseline.png';
import stretch from './img/stretch.png';
import wrap from './img/wrap.png';
import nowrap from './img/nowrap.png';
import { Tooltip } from 'antd';

const config = [
  {
    title: '主轴方向 / Flex-Direction',
    key: 'flex-direction',
    getValue: ({ style }: CssProps) =>
      style?.filter(css => css.key === 'flex-direction')[0]?.value,
    items: [
      {
        value: 'column',
        icon: (
          <Tooltip placement="right" title="column">
            <InsertRowBelowOutlined />
          </Tooltip>
        ),
      },
      {
        value: 'row',
        icon: (
          <Tooltip placement="right" title="row">
            <InsertRowLeftOutlined />
          </Tooltip>
        ),
      },
    ],
  },
  {
    title: '主轴对齐 / Justify-Content',
    key: 'justify-content',
    getValue: ({ style }: CssProps) =>
      style?.filter(css => css.key === 'justify-content')[0]?.value,
    items: [
      {
        value: 'flex-start',
        icon: (
          <Tooltip placement="right" title="flex-start">
            <img alt="" src={FlexStart} />
          </Tooltip>
        ),
      },
      {
        value: 'flex-end',
        icon: (
          <Tooltip placement="right" title="flex-end">
            <img alt="" src={FlexEnd} />
          </Tooltip>
        ),
      },
      {
        value: 'center',
        icon: (
          <Tooltip placement="right" title="center">
            <img alt="" src={center} />
          </Tooltip>
        ),
      },
      {
        value: 'space-between',
        icon: (
          <Tooltip placement="right" title="space-between">
            <img alt="" src={SpaceBetween} />
          </Tooltip>
        ),
      },
      {
        value: 'space-around',
        icon: (
          <Tooltip placement="right" title="space-around">
            <img alt="" src={SpaceAround} />
          </Tooltip>
        ),
      },
    ],
  },
  {
    title: '交叉轴对齐 / Align-Items:',
    key: 'align-items',
    getValue: ({ style }: CssProps) =>
      style?.filter(css => css.key === 'align-items')[0]?.value,
    items: [
      {
        value: 'flex-start',
        icon: (
          <Tooltip placement="right" title="flex-start">
            <img alt="" src={ItemStart} />
          </Tooltip>
        ),
      },
      {
        value: 'flex-end',
        icon: (
          <Tooltip placement="right" title="flex-end">
            <img alt="" src={ItemEnd} />
          </Tooltip>
        ),
      },
      {
        value: 'center',
        icon: (
          <Tooltip placement="right" title="center">
            <img alt="" src={center} />
          </Tooltip>
        ),
      },
      {
        value: 'baseline',
        icon: (
          <Tooltip placement="right" title="baseline">
            <img alt="" src={baseline} />
          </Tooltip>
        ),
      },
      {
        value: 'stretch',
        icon: (
          <Tooltip placement="right" title="stretch">
            <img alt="" src={stretch} />
          </Tooltip>
        ),
      },
    ],
  },
  {
    title: '排列规则 / Flex-Wrap',
    key: 'flex-wrap',
    getValue: ({ style }: CssProps) =>
      style?.filter(css => css.key === 'flex-wrap')[0]?.value,
    items: [
      {
        value: 'wrap',
        icon: (
          <Tooltip placement="right" title="wrap">
            <img alt="" src={wrap} />
          </Tooltip>
        ),
      },
      {
        value: 'nowrap',
        icon: (
          <Tooltip placement="right" title="nowrap">
            <img alt="" src={nowrap} />
          </Tooltip>
        ),
      },
      {
        value: 'wrap-reverse',
        icon: (
          <Tooltip placement="right" title="wrap-reverse">
            <VerticalAlignBottomOutlined />
          </Tooltip>
        ),
      },
    ],
  },
  {
    title: '多轴对齐 / align-content',
    key: 'align-content',
    getValue: ({ style }: CssProps) =>
      style?.filter(css => css.key === 'align-content')[0]?.value,
    items: [
      {
        value: 'flex-start',
        icon: (
          <Tooltip placement="right" title="flex-start">
            <img alt="" src={FlexStart} />
          </Tooltip>
        ),
      },
      {
        value: 'flex-end',
        icon: (
          <Tooltip placement="right" title="flex-end">
            <img alt="" src={FlexEnd} />
          </Tooltip>
        ),
      },
      {
        value: 'center',
        icon: (
          <Tooltip placement="right" title="center">
            <img alt="" src={center} />
          </Tooltip>
        ),
      },
      {
        value: 'space-between',
        icon: (
          <Tooltip placement="right" title="space-between">
            <img alt="" src={SpaceBetween} />
          </Tooltip>
        ),
      },
      {
        value: 'space-around',
        icon: (
          <Tooltip placement="right" title="space-around">
            <img alt="" src={SpaceAround} />
          </Tooltip>
        ),
      },
      {
        value: 'stretch',
        icon: (
          <Tooltip placement="right" title="stretch">
            <img alt="" src={stretch} />
          </Tooltip>
        ),
      },
    ],
  },
];

const Flex: React.FC<CssProps> = ({ style = [], onChange }) => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.clear}>
        <Tooltip placement="right" title="清空">
          <ClearOutlined
            onClick={() => {
              onChange?.([
                ...style.filter(
                  css => !config.map(({ key }) => key).includes(css.key),
                ),
              ]);
            }}
          />
        </Tooltip>
      </div>
      {config.map(({ title, key, getValue, items }) => (
        <div className={styles.flexWarper} key={key}>
          <div>
            {title}: {getValue({ style })}
          </div>
          <div className={styles.flexItem}>
            {items.map(({ value, icon }) => {
              const selectStyle =
                value === getValue({ style })
                  ? {
                      border: `1px solid rgb(145, 213, 255)`,
                    }
                  : {};
              return (
                <div
                  style={selectStyle}
                  key={value}
                  onClick={() => {
                    onChange?.([
                      {
                        key,
                        value,
                      },
                      ...style.filter(css => css.key !== key),
                    ]);
                  }}
                >
                  {icon}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Flex;
