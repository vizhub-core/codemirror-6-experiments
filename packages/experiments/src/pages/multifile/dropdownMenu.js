import { h } from 'preact';

export const DropdownMenu = props => {
  const {
    options,
    onOptionClicked,
    selectedOption
  } = props;

  return (
    <select onChange={ e => onOptionClicked(e.target.value) }>
      {
        options.map(option => (
          <option value={ option } >
            { option }
          </option>
        ))
      }
    </select>
  );
};
