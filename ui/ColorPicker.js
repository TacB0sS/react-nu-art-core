import {React, css, BaseComponent, PropTypes} from '../defaults';
import {SketchPicker} from 'react-color'
const style_swatch = css({
  padding: '5px',
  background: '#fff',
  borderRadius: '1px',
  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
  display: 'inline-block',
  cursor: 'pointer',
});

const style_popover = css({
  position: 'absolute',
  zIndex: '2',
});

const style_cover = css({
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
});

class ColorPicker
  extends BaseComponent {

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      displayColorPicker: false,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.color === state.id)
      return null;

    return {
      id: props.color,
      color: props.color,
    };
  }

  onClick() {
    this.setState({displayColorPicker: !this.state.displayColorPicker})
  };

  onClose() {
    this.setState({displayColorPicker: false})
  };

  onChange(color) {
    this.props.onColorChanged(color.rgb, this.props.id);
    this.setState({color: color.rgb});
  };

  render() {
    const style_color = css({
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
    });

    return (
      <div>
        <div className={ style_swatch } onClick={ this.onClick }>
          <div className={ style_color }/>
        </div>

        { this.state.displayColorPicker ? <div className={ style_popover }>
          <div className={ style_cover } onClick={ this.onClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.onChange }/>
        </div> : null }
      </div>
    )
  }
}

ColorPicker.propTypes = {
  onColorChanged: PropTypes.func,
  color: PropTypes.object,
  id: PropTypes.any,
};

export default ColorPicker
