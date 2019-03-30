import { connect } from 'react-redux'
import FormLogin from './FormLogin'
import populate_user from '../../store/actions/populate_user'
import http_request_get_self from '../../store/actions/http_request_get_self'

const mapStateToProps = (state, ownProps) => ({
  openModal: ownProps.openModal,
  history: ownProps.history,
  _id: state.loggedin._id
})

const mapDispatchToProps = (dispatch) => ({
  populate_user: (user) => {  dispatch(populate_user(user)) },
  http_request_get_self: (user) => { dispatch(http_request_get_self(user))}
})

const FormLoginContainer = connect(mapStateToProps, mapDispatchToProps)(FormLogin)

export default FormLoginContainer
