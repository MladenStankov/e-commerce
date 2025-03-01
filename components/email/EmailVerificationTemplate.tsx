import React from "react";

interface IProps {
  url: string;
}

export default function EmailVerificationTemplate({ url }: IProps) {
  return (
    <html>
      <head></head>
      <body>
        <h1>Verify your email</h1>
        <p>
          Click <a href={url}>here</a> to verify your email
        </p>
      </body>
    </html>
  );
}
