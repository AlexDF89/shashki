import { connect } from 'react-redux';

import Field from '../components/Field';
import { copyLink } from '../actions';

function mapStateToProps(state) {
  return {
    field: state.field
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     onCopyLink: () => dispatch(copyLink())
//   }
// }

const FieldContainer = connect(mapStateToProps, null)(Field);

export default FieldContainer;