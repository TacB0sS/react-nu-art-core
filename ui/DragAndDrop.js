import React, {Component} from 'react';
import {css} from 'emotion'

const dragAndDropIn = css`
  margin: auto;
  display: inline-block;
`;

const idleStyle = css`
  display: flex;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
  padding: 20px;
  background-color: #eeeeee;
  box-shadow: 0 0 0 1px rgba(41, 41, 41, 0.2) inset;
  border-radius: 40px !important;
  label: drag-and-drop-container;
`;

const dragAndDropOver = css`
  ${idleStyle}
  display: flex;
  background-color: #777777;
`;

class DragAndDrop
  extends Component {

  constructor(props) {
    super(props);
    this.state = {state: "idle"};

    const _props = this.props || {};
    this.validateContent = _props.validateContent || (() => true);
    this.idleStyle = _props.idleStyle || idleStyle;
    this.positiveStyle = _props.positiveStyle || idleStyle;
    this.negativeStyle = _props.negativeStyle || idleStyle;
    this._onDrop = _props.onDrop
      || ((files) => files.forEach((file, index) => console.log(`file name[${index}] = ${file.name}`)));
  }

  onDrop(ev) {
    ev.preventDefault();

    let files = this.extractContent(ev);
    let state = "idle";
    if (files.length > 0) {
      state = this.props.validateContent(files) ? "positive" : "negative";
      this._onDrop(ev.target.id, files);
    }

    this.setState(() => {
      return {
        state: state
      };
    });

    this.removeDragData(ev);
  }

  extractContent(ev) {
    let items = ev.dataTransfer.items;
    let files;
    if (items) {
      files = [];
      for (let i = 0; i < items.length; i++) {
        files.push(items[i]);
      }

      files = files.filter(item => item.kind === 'file').map(item => item.getAsFile());
    } else {
      files = ev.dataTransfer.files;
    }
    return files;
  }

  onDragEnter(ev) {
    ev.preventDefault();
    this.setState(() => {
      return {
        state: "over"
      };
    });
  }

  onDragOver(ev) {
    ev.preventDefault();
    this.setState(() => {
      return {
        state: "over"
      };
    });
  }

  onDragExit(ev) {
    this.setState(() => {
      return {
        state: "idle"
      };
    });
  }

  onDragLeave(ev) {
    this.setState(() => {
      return {
        state: "idle"
      };
    });
  }

  removeDragData(ev) {
    // console.log('Removing drag data')

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      ev.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      ev.dataTransfer.clearData();
    }
  }

  render() {
    let style;
    switch (this.state.state) {
      case "idle":
        style = this.idleStyle;
        break;

      case "positive":
        style = this.positiveStyle;
        break;

      case "negative":
        style = this.negativeStyle;
        break;
    }
    return (
      <div id={this.props && this.props.id} className={style}
           onDrop={this.onDrop.bind(this)}
           onDragEnter={this.onDragEnter.bind(this)}
           onDragExit={this.onDragExit.bind(this)}
           onDragOver={this.onDragOver.bind(this)}
           onDragLeave={this.onDragLeave.bind(this)}
      >
        <div className={dragAndDropIn}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DragAndDrop;
