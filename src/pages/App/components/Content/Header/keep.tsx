import { Button, Input, Popover } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { AppContext } from 'src/context';

const Keep: React.FC<{}> = () => {
  const { appService } = useContext(AppContext);

  const project = appService.project;
  const historyProject = appService.projects.get(project.ID);
  const pages = project.getPages();
  const pagesLen = Object.keys(pages).length;

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const isDisable = useMemo(() => {
    const pageIds = Object.values(historyProject?.pages || {}).map(page => page.id);

    return (
      name === project.name &&
      description === project.description &&
      Object.values(pages).every(page => {
        const curPageId = page.history.history.slice(-1).pop()?.id;

        const historyPageId = Object.values(historyProject?.pages || {})
          .find(({ id }) => id === page.id)
          ?.history.history.slice(-1)
          .pop()?.id;

        return pageIds.includes(page.id) ? curPageId === historyPageId : false;
      })
    );
    // eslint-disable-next-line
  }, [historyProject, project, name, description, pages, pagesLen]);

  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
  }, [project]);

  return (
    <Popover
      content={
        <>
          <div>
            <span>项目名</span>
            <Input
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <span>项目描述</span>
            <Input.TextArea
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </>
      }
      title="项目信息"
    >
      <Button
        disabled={isDisable}
        onClick={() => {
          project.updateName(name);
          project.updateDescription(description);
          appService.keep();
        }}
      >
        保存
      </Button>
    </Popover>
  );
};

export default Keep;
