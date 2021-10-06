import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../src/component/ErrorFallback/ErrorFallback';
import Failure from '../src/component/Failure/Failure';

const Err = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Failure />
  </ErrorBoundary>
);

export default Err;
