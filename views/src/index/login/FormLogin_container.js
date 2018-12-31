import { connect } from 'react-redux'
import FormLogin from './FormLogin'
import populate_user from '../../store/actions/populate_user'

const mapStateToProps = (state, ownProps) => ({
  openModal: ownProps.openModal,
  history: ownProps.history
})

const mapDispatchToProps = (dispatch) => ({
  populate_user: (user) => {  dispatch(populate_user(user)) }
})

const FormLoginContainer = connect(mapStateToProps, mapDispatchToProps)(FormLogin)

export default FormLoginContainer
