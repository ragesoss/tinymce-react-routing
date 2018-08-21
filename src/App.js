import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import logo from './logo.svg';
import './App.css';

const initialValue = '<a href="/subpage/subsubpage">This is the rendered link from the TinyMCE content"</a>. It initially points to "/subpage/subsubpage", but on editor change, the value will update to a different link if the route has changed.';


const EditorParent = () => {
  return (
    <div>
      <Link to="/subpage/subsubpage">Then, click here to navigate to /subpage/subsubpage.</Link>
      <Route path="/subpage/subsubpage" component={SubSubPage} />
      <EditorComponent />
    </div>
  )
}

const SubSubPage = () => {
  return (
    <div>Now, make a change in the editor. The link target in the TinyMCE content will change from "/subpage/subsubpage" to "/subpage/subpage/subsubpage"</div>
  )
}
 
class EditorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { content: initialValue };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content) {
    this.setState({ content });
    console.log(content)
  }

  render() {
    return(
      <div>
        <Editor value={this.state.content} onEditorChange={this.handleEditorChange} />
        <div dangerouslySetInnerHTML={ {__html: this.state.content} }/>
      </div>
    )
  }
}

class CoreApp extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ohai</h1>
        </header>
        <p className="App-intro">
          <Link to="/subpage">First, click here to navigate to /subpage, which renders TinyMCE.</Link>
          <br />
        </p>
        <Route path="/subpage" component={EditorParent} />
      </div>
    );
  }
}

const App = () => (
  <Router>
    <CoreApp />
  </Router>
);

export default App;
