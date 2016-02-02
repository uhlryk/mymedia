import React from 'react';
import TopMenu from './TopMenu.jsx';

class App extends React.Component {

  render() {
    return (
      <div>
        <TopMenu />
        {this.props.children}
      </div>
    );
  }
}

export default App;
