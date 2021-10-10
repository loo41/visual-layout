import {
  AppService,
  NodeService,
  PageService,
  ProjectService,
} from 'src/controller';
import { randomChart } from 'src/util';
import { isElement } from 'src/controller/util';
import { CodeConfig, getInitCodeConfig } from '..';
import { isString } from 'lodash';
import { html_beautify, css_beautify } from 'js-beautify';
import _ from 'lodash';
import { getTemplate } from './template';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export enum templateType {
  classComponent = 'class-component',
  functionComponent = 'function-component',
  style = 'style',
}

export type Language = 'javascript' | 'css' | 'less' | 'scss' | 'json' | 'html';
export enum Type {
  module = 'module',
  more = 'more',
  none = 'none',
}
export interface Dep {
  [props: string]: {
    import: string[];
    type: Type;
  };
}

export interface FileContent {
  name: string;
  suffix: string;
  code: string;
  template: templateType;
  dep: Dep;
  language: Language;
}

export interface File {
  [props: string]: FileContent;
}

const getRenderer = (language: Language) => {
  if (['css', 'less', 'scss'].includes(language)) {
    return (code: string) =>
      css_beautify(code, {
        end_with_newline: true,
        indent_size: 2,
      });
  } else {
    return (code: string) =>
      html_beautify(code, {
        end_with_newline: true,
        indent_size: 2,
      });
  }
};

const radomString = randomChart(7);
const generateCodeFiles = (
  page: PageService,
  codeConfig: CodeConfig,
): [string, FileContent][] => {
  const files: File = {};
  const { cssModule, cssFileSuffix, fileSuffix, cssLocation, component } =
    codeConfig;

  const CSS_FILE_NAME = cssModule
    ? `index.module.${cssFileSuffix}`
    : `index.${cssFileSuffix}`;

  const generateCode = ({
    node,
    isRoot = false,
    filePath,
  }: {
    node: NodeService;
    isRoot?: boolean;
    filePath: string;
  }): string => {
    const { _name, type, className, codeConfig, styles, props, children } = node;
    const { isComponent, componentName } = codeConfig;

    if (isComponent && !isRoot) {
      const name = _.capitalize(componentName || radomString());

      files[filePath].dep[`./${name}.${fileSuffix}`] = {
        import: [name],
        type: Type.module,
      };

      const childFilePath = `${name}.${fileSuffix}`;

      files[childFilePath] = {
        name: name,
        suffix: fileSuffix,
        dep: {
          [`./${CSS_FILE_NAME}`]: {
            import: ['styles'],
            type: cssModule ? Type.module : Type.none,
          },
        },
        language: 'javascript',
        template: component,
        code: ``,
      };

      const code = generateCode({ node, isRoot: true, filePath: childFilePath });

      files[childFilePath].code = code;

      return `<${name} />`;
    }

    const getClassName = (): string => {
      if (className) {
        const prefix = 'className';
        const suffix = cssModule ? `styles.${className}` : `"${className}"`;
        return ` ${prefix}=${suffix}`;
      }
      return '';
    };

    const getStyle = () => {
      if (!styles.length) return '';
      if (cssLocation === 'inner') {
        const reactStyle = styles
          .map(({ key, value }) => {
            return `${key}: "${value}"`;
          })
          .join(',');
        return ` style={{${reactStyle}}}`;
      } else {
        const ClassName = (className || radomString()).toLowerCase();
        files[CSS_FILE_NAME] = {
          ...files[CSS_FILE_NAME],
          code: `${files[CSS_FILE_NAME]?.code || ''}
            .${ClassName} {
              ${styles.map(({ key, value }) => `${key}: ${value};`).join('\n')}
            }`,
        };
        return cssModule
          ? ` className={styles.${ClassName}}`
          : ` className="${ClassName}"`;
      }
    };

    const getProps = () => {
      if (props) {
        const pro = Object.entries(props).reduce((props, [key, value]) => {
          props[key] = isElement(value)
            ? generateCode({ node: value as NodeService, filePath })
            : value;
          return props;
        }, {} as { [props: string]: string | unknown });

        const getValue = (value: any): any => {
          if (typeof value === 'string') {
            return `"${value}"`;
          }
          if (Array.isArray(value)) {
            return `[${value.map(_ => getValue(_)).join(',')}]`;
          }

          if (Object.prototype.toString.call(value) === '[object Object]') {
            return `{ ${Object.entries(value)
              .map(([key, _]) => {
                return `${key}: ${getValue(_)}`;
              })
              .join(',')} }`;
          }

          return value;
        };

        return ` ${Object.entries(pro)
          .map(([key, value]) => {
            return `${key}={${getValue(value)}}`;
          })
          .join('\n')}`;
      }
      return '';
    };

    if (type === 'Component') {
      const importFrom = AppService.components.get(_name.split('.')[0])?.from;

      if (importFrom) {
        const dep = files[filePath].dep[importFrom];
        if (dep) {
          dep.import.push(_name);
        } else {
          files[filePath].dep[importFrom] = {
            import: [_name],
            type: Type.more,
          };
        }
      } else {
        console.log(`${_name} source not found`);
      }
    }

    return `<${_name}${getClassName()}${getStyle()}${getProps()}>${
      isString(children)
        ? children
        : (children || [])
            .map(child =>
              isString(child) ? child : generateCode({ node: child, filePath }),
            )
            .join('')
    }</${_name}>`;
  };

  if (cssLocation === 'link') {
    files[CSS_FILE_NAME] = {
      name: `index`,
      suffix: cssModule ? `module.${cssFileSuffix}` : cssFileSuffix,
      language: cssFileSuffix,
      dep: {},
      template: templateType.style,
      code: ``,
    };
  }

  files[`App.${fileSuffix}`] = {
    name: `App`,
    suffix: fileSuffix,
    dep: {},
    language: 'javascript',
    template: component,
    code: ``,
  };

  const code = generateCode({ node: page.page, filePath: `App.${fileSuffix}` });

  files[`App.${fileSuffix}`].code = code;

  if (cssLocation === 'link') {
    files[`App.${fileSuffix}`].dep = {
      ...files[`App.${fileSuffix}`].dep,
      [`./${CSS_FILE_NAME}`]: {
        import: ['styles'],
        type: cssModule ? Type.module : Type.none,
      },
    };
  }

  return Object.entries(files).map(([key, values]) => {
    const { template, language } = values;
    return [
      key,
      {
        ...values,
        code: getRenderer(language)(getTemplate(template)(values)),
      },
    ];
  });
};

const exportCode = (
  project: ProjectService,
  codeConfig: CodeConfig = getInitCodeConfig(),
) => {
  const zip = new JSZip();
  Object.values(project.getPages()).forEach(page => {
    const files = generateCodeFiles(page, codeConfig);
    files.forEach(([key, { code }]) => {
      zip.folder(page.name)?.file(key, code);
    });
  });

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${project.name || 'Project'}.zip`);
  });
};

export { getTemplate, generateCodeFiles, exportCode };
