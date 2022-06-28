// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component, ErrorInfo } from 'react';
import { logEvent } from 'firebase/analytics';

import Events from '~/src/events';
import { getAppAnalyticsInstance } from '~/src/firebase';

import Header from '~/src/components/Header';
import Footer from '~/src/components/Footer';

export type ErrorBoundaryProps = {
  children: JSX.Element;
};

export type ErrorBoundaryState = {
  thrownError: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { thrownError: null };
  }

  static getDerivedStateFromError(thrownError: Error) {
    return { thrownError };
  }

  componentDidCatch(thrownError: Error, errorInfo: ErrorInfo) {
    logEvent(getAppAnalyticsInstance(), Events.ErrorBoundaryCaughtError, {
      thrownError,
      errorInfo,
    });
  }

  render() {
    const { thrownError } = this.state;

    if (thrownError) {
      return (
        <div className="ErrorBoundary">
          <Header renderAccountButton={false} />
          <div className="error-message">
            Something has gone wrong. The issue has been reported for you.
          </div>
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}
