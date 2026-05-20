import React from "react";

type ErrorBannerProps = {
  message: string;
};

export const ErrorBanner = ({ message }: ErrorBannerProps) => {
  return (
    <p className="error-banner" role="alert">
      {message}
    </p>
  );
};
