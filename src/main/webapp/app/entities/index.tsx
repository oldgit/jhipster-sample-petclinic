import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Owner from './owner';
import Pet from './pet';
import Visit from './visit';
import Vet from './vet';
import Specialty from './specialty';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}owner`} component={Owner} />
      <ErrorBoundaryRoute path={`${match.url}pet`} component={Pet} />
      <ErrorBoundaryRoute path={`${match.url}visit`} component={Visit} />
      <ErrorBoundaryRoute path={`${match.url}vet`} component={Vet} />
      <ErrorBoundaryRoute path={`${match.url}specialty`} component={Specialty} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
