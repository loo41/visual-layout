import { createContext, useState } from 'react';
import { AppService } from 'src/controller';

const appService = new AppService();
export const AppContext = createContext<{
  appService: AppService;
  refresh: boolean;
}>({
  appService,
  refresh: false,
});

export const PagesProvider: React.FC<{}> = ({ children }) => {
  const [refresh, setRefresh] = useState<boolean>(false);

  AppService.updateView = () => setRefresh(!refresh);

  return (
    <AppContext.Provider value={{ appService, refresh }}>
      {children}
    </AppContext.Provider>
  );
};
