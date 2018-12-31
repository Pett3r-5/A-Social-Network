import { connect } from 'react-redux'
import UserBody from './UserBody'
import add_post from '../store/actions/post_add'

const mapStateToProps = (state) => ({
  posts: state.loggedin.posts
})

const mapDispatchToProps = (dispatch) => ({
  add_post: (post) => {  dispatch(add_post(post)) }
})

const UserBodyContainer = connect(mapStateToProps, mapDispatchToProps)(UserBody)

export default UserBodyContainer
