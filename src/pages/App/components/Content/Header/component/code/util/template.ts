import { Dep, FileContent, templateType, Type } from '.';

const getTemplate = (
  type: string,
): (({ name, dep, code }: FileContent) => string) => {
  switch (type) {
    case templateType.classComponent:
      return CLASS;
    case templateType.functionComponent:
      return FUNC;
    default:
      return ({ name, dep, code }) => code;
  }
};

const getDepImport = (dep: Dep) => {
  return Object.entries(dep)
    .map(([key, value]) => {
      switch (value.type) {
        case Type.module:
          return `import ${value.import[0]} from "${key}";`;
        case Type.more:
          return `import ${`{ ${[
            // @ts-ignore
            ...new Set(value.import.filter(name => !/\./.test(name))),
          ].join(', ')} }`} from "${key}";`;
        case Type.none:
          return `import "${key}";`;
        default:
          return null;
      }
    })
    .filter(_ => _)
    .join('\n');
};

const CLASS = ({ name, dep, code }: FileContent) => `import React from "react";
${getDepImport(dep)}

class ${name} extends React.Component {
  render() {
    return (
      ${code}
    )
  }
}

export default ${name};`;

const FUNC = ({
  name,
  dep,
  code,
  suffix,
}: FileContent) => `import React from 'react';
${getDepImport(dep)}

const ${name}${suffix === 'tsx' ? ': React.FC<{}>' : ''} = () => {
  return (
    ${code}
  );
};

export default ${name};`;

export { getTemplate };
