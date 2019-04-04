import { connect } from 'react-redux';

import Field from '../components/Field';

function mapStateToProps(state) {
  return {
    field: state.field
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     onSetField: field => dispatch(setField(field))
//   }
// }

const FieldContainer = connect(mapStateToProps, null)(Field);

export default FieldContainer;