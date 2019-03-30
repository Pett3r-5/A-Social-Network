import { connect } from 'react-redux'
import User from './user'
import populate_user from '../store/actions/populate_user'
import http_request_get_user from '../store/actions/http_request_get_user'

const mapStateToProps = (state, ownProps) => ({
  _id: state.loggedin._id,
  authenticated: state.loggedin.auth,
  history: ownProps.history
})

const mapDispatchToProps = (dispatch) => ({
  populate_user: (user) => {  dispatch(populate_user(user)) },
  http_request_get_user: (user) => { dispatch(http_request_get_user(user)) }
})

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User)

export default UserContainer
