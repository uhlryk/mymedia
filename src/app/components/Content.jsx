import React from 'react';
import ReactRedux from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Pages from '../pages';
import Collections from './pages/Collections.jsx'
import Collection from './pages/Collection.jsx'
class Content extends React.Component {

  render() {
    var content = null;
    switch(this.props.page) {
    case Pages.COLLECTION_LIST:
      content = <Collections />;
      break;
    case Pages.MEDIA_LIST:
      content = <Collection />;
      break;
    }
    console.log(this.props.page);
    return (
      <div className="container">
        {content}
      </div>
    );
  }
}

function select(state) {
  return {
    page: state.page
  }
}

export default ReactRedux.connect(select)(Content);
