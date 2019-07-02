import { connect } from 'react-redux';

import Field from '../components/Field';
import { handleDrop, highlightTargets, showRules } from '../actions';

function mapStateToProps(state) {
  return {
    rules: state.rules,
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onHandleDrop: drop => dispatch(handleDrop(drop)),
    onHighlightTargets: (checker, data, extinguishTargets) => dispatch(highlightTargets(checker, data, extinguishTargets)),
    onShowRules: rules => dispatch(showRules(rules))
  }
}

const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);

export default FieldContainer;