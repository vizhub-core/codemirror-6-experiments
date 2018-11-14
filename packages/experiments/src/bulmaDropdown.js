import { h, Component } from 'preact';

export class BulmaDropdown extends Component {
  constructor() {
    super();
    this.state.isActive = false;
    this.toggle = () => {
      console.log(this.state.isActive);
      this.setState({ isActive: !this.state.isActive });
    };
  }
  render(props, state) {
    return (
      <div onClick={this.toggle} className={'dropdown' + (state.isActive ? ' is-active' : '')}>
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Dropdown button</span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a className="dropdown-item">
              Other dropdown item
            </a>
          </div>
        </div>
      </div>
    );
  }
}
  // <select
  //   onChange={e => onOptionClicked(e.target.value)}
  //   value={selectedOption}
  // >
  //   {options.map(option => (
  //     <option key={option} value={option}>
  //       {option}
  //     </option>
  //   ))}
  // </select>
