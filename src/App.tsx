import { Providers } from './appProviders/Providers';
import { Routing } from './routing/Routing';

export const App = () => {
  return (
    <Providers>
      <Routing />
    </Providers>
  );
};
