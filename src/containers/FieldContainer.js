import { connect } from 'react-redux';

import Field from '../components/Field';
import { handleDrop, highlightTargets } from '../actions';

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onHandleDrop: drop => dispatch(handleDrop(drop)),
    onHighlightTargets: (checker, data, extinguishTargets) => dispatch(highlightTargets(checker, data, extinguishTargets))
  }
}

const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);

export default FieldContainer;