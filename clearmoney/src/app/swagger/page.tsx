"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerPage() {
  if (process.env.NODE_ENV === "production") {
    return <div>Not found</div>;
  }
  return (
    <div className="p-4">
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
