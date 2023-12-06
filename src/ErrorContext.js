import React, { createContext, useState, useContext } from 'react';
import { useLoading } from './LoadingContext';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {hideLoading } = useLoading();

  const showError = (message) => {
    hideLoading();
    setErrorMessage(message);
    setIsError(true);
  };

  const hideError = () => {
    setErrorMessage("");
    setIsError(false);
  };

  return (
    <ErrorContext.Provider value={{ isError, showError, hideError }}>
      <div className={isError ? "error-container d-show" : "error-container d-none"}>
            <div className="error">
                {errorMessage}
            </div>
            <div>
              <button className="form-control btn btn-danger" onClick={hideError}>Close</button>
            </div>
        </div>
        <div className={isError ? "d-none" : "d-show"}>{children}</div>
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};
