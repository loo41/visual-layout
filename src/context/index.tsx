import { useEffect } from 'react';
import { phone } from 'src/const/container';
import { createContext, useState } from 'react';
import { cloneDeep } from 'src/util';
import { PagesService } from 'src/controller';
import { PreviewStyle, SelectStyle } from 'src/const';

export const Options = {
  page: cloneDeep(phone),
  selectStyle: SelectStyle,
  previewStyle: PreviewStyle,
};

const pagesService = new PagesService();
export const PagesContext = createContext<{
  pagesService: PagesService;
  refresh: boolean;
}>({
  pagesService,
  refresh: false,
});

export const PagesProvider: React.FC<{}> = ({ children }) => {
  const [refresh, setRefresh] = useState<boolean>(false);

  pagesService.init(() => {
    setRefresh(!refresh);
  });

  useEffect(() => {
    pagesService.cerate(Options);
  }, []);

  return (
    <PagesContext.Provider value={{ pagesService, refresh }}>
      {children}
    </PagesContext.Provider>
  );
};
