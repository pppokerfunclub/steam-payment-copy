import * as React from "react";

export const DepositsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="wallet"
    width="16"
    height="16"
    fill="currentColor"
    className="icon"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M15.2 6.4h-.8V4.8c0-.882-.718-1.6-1.6-1.6h-.306L11.115.442a.8.8 0 0 0-1.013-.385L2.246 3.2H1.6C.718 3.2 0 3.918 0 4.8v9.6c0 .882.718 1.6 1.6 1.6h11.2c.882 0 1.6-.718 1.6-1.6v-1.6h.8a.8.8 0 0 0 .8-.8V7.2a.8.8 0 0 0-.8-.8m-5.186-4.584.692 1.384H6.554zM14.4 11.2H9.132l-1.6-1.6 1.6-1.6H14.4z"></path>
    <path fill="inherit" d="M10.4 10.4a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6"></path>
  </svg>
);
