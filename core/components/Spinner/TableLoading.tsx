import InnerSpinner from './InnerSpinner';

const TableLoading = ({ bgColor }: { bgColor?: string }) => (
  <InnerSpinner
    color="error"
    size="3rem"
    thickness={4}
    disableAbsolute={false}
    bgColor={bgColor}
  />
);

export default TableLoading;
