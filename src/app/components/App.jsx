import React from 'react';
import TopMenu from './TopMenu.jsx';
import Content from './Content.jsx';

class App extends React.Component {

  render() {
    return (
      <div>
        <TopMenu />
        <Content />
      </div>
    );
  }
}

export default App;
