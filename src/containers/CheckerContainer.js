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
    onHandleDrop: checker => dispatch(handleDrop(checker))
  }
}

const CheckrerContainer = connect(mapStateToProps, mapDispatchToProps)(Checker);

export default CheckrerContainer;