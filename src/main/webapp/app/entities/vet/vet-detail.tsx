import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vet.reducer';
import { IVet } from 'app/shared/model/vet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VetDetail = (props: IVetDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vetEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="petclinicApp.vet.detail.title">Vet</Translate> [<b>{vetEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="petclinicApp.vet.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{vetEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="petclinicApp.vet.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{vetEntity.lastName}</dd>
          <dt>
            <Translate contentKey="petclinicApp.vet.speciality">Speciality</Translate>
          </dt>
          <dd>
            {vetEntity.specialities
              ? vetEntity.specialities.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === vetEntity.specialities.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/vet" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vet/${vetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vet }: IRootState) => ({
  vetEntity: vet.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VetDetail);
