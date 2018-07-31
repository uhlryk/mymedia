import { compose, lifecycle, branch, renderComponent } from "recompose";

import ListProjects from "../components/ListProjects";
import Loader from "../../../../frontend/components/spinner/Spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { NAME } from "../constants";

const withData = lifecycle({
    state: { loading: true },
    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ loading: false });
        // },5000);

    }
});

const enhance = compose(
    withData,
    branch(
        ({ loading }) => loading,
        renderComponent(Loader)
    )
);

export default withRouter(
    connect(
        state => ({
            projects: []
        }),
        (dispatch, props) => ({

        })
    )(translate(NAME)(enhance(ListProjects)))
);
