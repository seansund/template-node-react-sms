// BackLink provides transparent integration with browser navigation for in-app back UI.
//
// For Main (/) > Detail (/detail) navigation with back support:
// - Use backState() in Main on the forward Link to /detail to indicate that going back is supported.
// - Use a BackLink to / in Detail for the back navigation. If the expected back state is present,
//   indicating that the forward navigation was followed, it will just goBack(). If not, indicating
//   that the user deep-linked directly to /detail, it will instead follow the link to /.
//
// The target of the BackLink should always match the location that the forward link came from.

import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

// Returns a state object that can be used in a Link to prop or history.push() call to indicate
// that going back is supported.
export function backState() {
  return { back: true };
}

export function canGoBack(history) {
  const state = history.location.state;
  return !!state && state.back === true;
}

export function goBack(history, path, state) {
  if (canGoBack(history)) {
    history.goBack();
    return true;
  }
  if (path != null) {
    history.push(path, state);
    return true;
  }
  return false;
}

const InnerBackLink = withRouter(({ history, linkProps }) => (
  <Link {...linkProps} onClick={e => goBack(history) && e.preventDefault()} />
));

// A back link with browser history integration. The to prop must be used to specify where to go
// if the user did not follow the expected in-app forward navigation to the current location.
// All other props are passed to the underlying Link, as well.
export default function BackLink({ ...props }) {
  return <InnerBackLink linkProps={props} />;
}

BackLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};
