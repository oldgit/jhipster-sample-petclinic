import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/owner">
      <Translate contentKey="global.menu.entities.owner" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pet">
      <Translate contentKey="global.menu.entities.pet" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/visit">
      <Translate contentKey="global.menu.entities.visit" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vet">
      <Translate contentKey="global.menu.entities.vet" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/specialty">
      <Translate contentKey="global.menu.entities.specialty" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
