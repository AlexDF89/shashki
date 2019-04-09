import { connect } from 'react-redux';

import Cell from '../components/Cell';
import { handleDrop } from '../actions';

function mapStateToProps(state) {
  return {
    field: state.field
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onHandleDrop: drop => dispatch(handleDrop(drop))
  }
}

const CellContainer = connect(mapStateToProps, mapDispatchToProps)(Cell);

export default CellContainer;