
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from "../actions/index";


class PostsShow extends Component {
    //componentDidMount is automatically executed when the component is rendered
    componentDidMount() {
        //getting the id from de URL

        //Sometimes you're really focus on network stuff and
        //you don't want to make more requests if you did it
        //some minutes ago. In that case you can wrap the
        //following 2 lines with if(!this.props.post)
        //but if the user stays a lot of time in the same page
        //it could be a problem, so, in this case I won't do it

        const { id } = this.props.match.params;

        this.props.fetchPost(id);
    }


    onDeleteClick() {

        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            //Redirect
            this.props.history.push('/');
        });
    }

    render() {

        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

//ownProps is equals to this.props. it's a convention
function mapStateToProps({ posts }, ownProps) {
    //I want to return just the post with the specific id
    return { post: posts[ownProps.match.params.id ] };
}

export default connect(mapStateToProps,
    { fetchPost, deletePost })(PostsShow);