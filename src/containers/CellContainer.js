import { connect } from 'react-redux';

import Cell from '../components/Cell';
import { canDrop } from '../actions';

function mapStateToProps(state) {
  return {
    drop: state.drop
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCanDrop: drop => dispatch(canDrop(drop))
  }
}

const CellContainer = connect(mapStateToProps, mapDispatchToProps)(Cell);

export default CellContainer;