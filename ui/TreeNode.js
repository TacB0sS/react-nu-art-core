import {React, BaseComponent, css, PropTypes} from '../defaults';

class TreeRenderer {
  getRendererForItem(item) {
    throw new Error("MUST Implement this method")
  }
}

class TreeNode
  extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {expanded: this.props.expanded};
  }

  toggleExpanded() {
    this.setState(() => {
      return {
        expanded: !this.state.expanded || false
      };
    })
  }

  renderNodes(items) {
    return (<div>{items.map((item, index) => {
        const Renderer = this.props.renderer;
        return <Renderer renderer={this.props.renderer} item={item} key={index} isLast={index === items.length - 1}
                         onClick={this.props.onClick}/>
      })}
      </div>
    );

  }
}

TreeNode.propTypes = {
  onClick: PropTypes.func
};

TreeNode.TreeRenderer = TreeRenderer;
export default TreeNode;

