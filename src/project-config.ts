import { cloneDeep } from 'lodash';
import { PreviewStyle, SelectStyle } from 'src/const';
import { computer } from 'src/const/container';
import { ProjectOptions } from 'src/controller';
import * as components from 'antd';
import { AppConfig } from 'src/controller';

export const options: ProjectOptions = {
  target: cloneDeep(computer),
  selectStyle: SelectStyle,
  previewStyle: PreviewStyle,
};

const Components = new Map();

for (const [key, value] of Object.entries(components)) {
  Components.set(key, {
    from: 'antd',
    to: value,
  });
}

const appConfig: AppConfig = {
  project: {
    options: options,
  },
  components: Components,
};

export default appConfig;
