import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './owner.reducer';
import { IOwner } from 'app/shared/model/owner.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOwnerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OwnerUpdate = (props: IOwnerUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ownerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/owner');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ownerEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="petclinicApp.owner.home.createOrEditLabel">
            <Translate contentKey="petclinicApp.owner.home.createOrEditLabel">Create or edit a Owner</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ownerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="owner-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="owner-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="owner-firstName">
                  <Translate contentKey="petclinicApp.owner.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="owner-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="owner-lastName">
                  <Translate contentKey="petclinicApp.owner.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="owner-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="owner-address">
                  <Translate contentKey="petclinicApp.owner.address">Address</Translate>
                </Label>
                <AvField
                  id="owner-address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="owner-city">
                  <Translate contentKey="petclinicApp.owner.city">City</Translate>
                </Label>
                <AvField
                  id="owner-city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="owner-telephone">
                  <Translate contentKey="petclinicApp.owner.telephone">Telephone</Translate>
                </Label>
                <AvField
                  id="owner-telephone"
                  type="text"
                  name="telephone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^\\d{10}$', errorMessage: translate('entity.validation.pattern', { pattern: '^\\d{10}$' }) }
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/owner" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  ownerEntity: storeState.owner.entity,
  loading: storeState.owner.loading,
  updating: storeState.owner.updating,
  updateSuccess: storeState.owner.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OwnerUpdate);
