import React from "react";
import { Link, Route } from "react-router-dom";
import ListProjectsView from "./views/ListProjectsView";
import * as constants from "./constants";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
class Main extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <h3>{t("sectionTitle")}</h3>
                <ul>
                    <li>
                        <Link to={constants.LIST_ROUTE_PATH}>{t("listTaskView")}</Link>
                    </li>
                    <li>
                        <Link to={constants.ADD_ROUTE_PATH}>{t("addTaskView")}</Link>
                    </li>
                </ul>

                <hr />

                <Route
                    exact
                    path={constants.LIST_ROUTE_PATH}
                    component={ListProjectsView}
                />
            </div>
        );
    }
}

Main.propTypes = {
    t: PropTypes.func.isRequired
};

export default translate(constants.NAME)(Main);
