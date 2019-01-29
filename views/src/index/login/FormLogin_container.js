import { connect } from 'react-redux'
import FormLogin from './FormLogin'
import populate_user from '../../store/actions/populate_user'
import http_request_get_user from '../../store/actions/http_request_get_user'

const mapStateToProps = (state, ownProps) => ({
  openModal: ownProps.openModal,
  history: ownProps.history,
  _id: state.loggedin._id
})

const mapDispatchToProps = (dispatch) => ({
  populate_user: (user) => {  dispatch(populate_user(user)) },
  http_request_get_user: (user) => { dispatch(http_request_get_user(user)) }
})

const FormLoginContainer = connect(mapStateToProps, mapDispatchToProps)(FormLogin)

export default FormLoginContainer
