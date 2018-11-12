export const dropdownMenu = (selection, props) => {
  const { options, onOptionClicked, selectedOption } = props;

  let select = selection.selectAll('select').data([null]);
  select = select
    .enter()
    .append('select')
    .merge(select)
    .on('change', function() {
      onOptionClicked(this.value);
    });

  const option = select.selectAll('option').data(options);
  option
    .enter()
    .append('option')
    .merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};
