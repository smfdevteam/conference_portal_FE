import DOMPurify from "dompurify";
import React from "react";

const Safe_HTML = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default Safe_HTML;
