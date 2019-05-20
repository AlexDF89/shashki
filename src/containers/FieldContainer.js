import { connect } from 'react-redux';

import Field from '../components/Field';
import { copyLink, handleDrop } from '../actions';

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //onCopyLink: () => dispatch(copyLink()),
    onHandleDrop: drop => dispatch(handleDrop(drop))
  }
}

const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);

export default FieldContainer;