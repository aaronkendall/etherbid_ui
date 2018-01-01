export default reduxConnectProps;

/**
 * reduxConnectProps
 *
 * Set the propTypes to the React object instead
 * of connect class using decorators
 * @param  {Class} ClassComponent Connect Class
 * @return {Class}                React Class with propTypes
 */
function reduxConnectProps(ClassComponent) {
  const ClassConnectedProps = ClassComponent;
  ClassConnectedProps.WrappedComponent.propTypes = ClassComponent.propTypes;
  ClassConnectedProps.WrappedComponent.defaultProps = ClassComponent.defaultProps;

  delete ClassConnectedProps.propTypes;
  delete ClassConnectedProps.defaultProps;

  return ClassConnectedProps;
}
