import { h } from 'preact';

export const DropdownMenu = props => {
  const { options, onOptionClicked, selectedOption } = props;

  return (
    <select
      onChange={e => onOptionClicked(e.target.value)}
      value={selectedOption}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
