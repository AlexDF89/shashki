import { connect } from 'react-redux';

import Checker from '../components/Checker';
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

const CheckrerContainer = connect(mapStateToProps, mapDispatchToProps)(Checker);

export default CheckrerContainer;