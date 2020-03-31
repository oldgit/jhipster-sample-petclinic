import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './visit.reducer';
import { IVisit } from 'app/shared/model/visit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisitDetail = (props: IVisitDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { visitEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="petclinicApp.visit.detail.title">Visit</Translate> [<b>{visitEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">
              <Translate contentKey="petclinicApp.visit.date">Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={visitEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="petclinicApp.visit.description">Description</Translate>
            </span>
          </dt>
          <dd>{visitEntity.description}</dd>
          <dt>
            <Translate contentKey="petclinicApp.visit.pet">Pet</Translate>
          </dt>
          <dd>{visitEntity.pet ? visitEntity.pet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/visit" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/visit/${visitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ visit }: IRootState) => ({
  visitEntity: visit.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisitDetail);
