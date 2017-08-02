(function(){
    'use strict';

    // 항목의 목록을 만드는 컴포넌트
    var Review = React.createClass({
        render: function () {
            return (
                <div className="list-group-item">
                    <small className="text-muted pull-right">{this.props.email}</small>
                    <h4 className="list-group-item-heading">{this.props.name}</h4>
                    <p class="list-group-item-text">{this.props.review}</p>
                </div>
            );
        }
    });

    // ReviewBox  컴포넌트와 그것을 수신하는 두개의 컴포넌트
    var ReviewBox = React.createClass({
        loadReviewFromServer: function () {
            $.ajax({
                url: this.props.api,
                type: 'GET',
                dataType: 'json',
                cache: false,
                success: function (data) {
                    console.log(data);
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.api, status, err.toString());
                }.bind(this)
            });
        },
        // POST메서드를 사용하여 같은 종단점인 /api/reviews에서 폼 제출을 처리한다
        handleReviewSubmit: function (review) {
            var reviews = this.state.data;
            // 실무에서는 Date.now()를 사용하지 말자, 아래는 단지 예제를 위한 것이다.
            review.id = Date.now().toString();
            var newReviews = reviews.concat([review]);
            this.setState({data: newReviews});
            console.log(review);
            $.ajax({
                url: this.props.api,
                dataType: 'json',
                type: 'POST',
                data: review,
                success: function (data) {
                    console.log(data);
                }.bind(this),
                error: function (xhr, status, err) {
                    this.setState({data: reviews});
                    console.error(this.props.api, status, err.toString());
                }.bind(this)
            });
        },
        getInitialState: function () {
            return {
                data: []
            };
        },
        componentDidMount: function () {
            this.loadReviewFromServer();
        },
        render: function () {
            return (
                <div>
                    <ReviewList data={this.state.data} />
                    <ReviewForm onReviewSubmit={this.handleReviewSubmit} />
                </div>
            );
        }
    });

    // ReviewList 컴포넌트
    var ReviewList = React.createClass({
        render:function () {
            var reviewNodes = this.props.data.map(function (review) {
                return (
                    <Review name={review.name} review={review.review} email={review.email} key={review.id}></Review>
                );
            });
            return (
                <div className="list-group">
                    {reviewNodes}
                </div>
            );
        }
    });

    // ReviewForm 컴포넌트
    var ReviewForm = React.createClass({
        getInitialState: function () {
            return {name: '', email: '', review: '', model: ''};
        },
        handleAuthorChange: function (e) {
            this.setState({name: e.target.value});
        },
        handleEmailChange: function (e) {
            this.setState({email: e.target.value});
        },
        handleTextChange: function (e) {
            this.setState({review: e.target.value});
        },
        handleSubmit: function (e) {
            e.preventDefault();
            var name = this.state.name.trim();
            var email = this.state.email.trim();
            var review = this.state.review.trim();
            var model = '57337088fabe969f2dd4078e';
            if (!review || !name) {
                return;
            }
            this.props.onReviewSubmit({name: name, email:email, model:model, review:review});
            this.setState({name: '', email: '', review: '', model: ''});
        },
        render: function () {
            return (
                <div>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <fieldset className="form-group">
                                    <label for="InputName">Name</label>
                                    <input type="review" className="form-control" id="InputName" placeholder="Name" value={this.state.name} onChange={this.handleAuthorChange} />
                                </fieldset>
                            </div>
                            <div className="col-lg-6">
                                <fieldset className="form-group">
                                    <label for="InputEmail">Email</label>
                                    <input type="review" className="form-control" id="InputEmail" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                                </fieldset>
                            </div>
                        </div>
                        <fieldset className="form-group">
                            <label for="TextAreaFeedback">Feedback</label>
                            <textarea className="form-control" id="TextAreaFeedback" rows="3" value={this.state.review} onChange={this.handleTextChange}></textarea>
                        </fieldset>
                        <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                    </form>
                </div>
            );
        }
    });

    // ReviewBox 컴포넌트를 content div내부에 랜더링
    ReactDOM.render(
      <ReviewBox api="/api/reviews" />, document.getElementById('content')
    );
})();
