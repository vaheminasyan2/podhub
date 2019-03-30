import React from "react";

// LIST AND LIST ITEM COMPONENTS

export const List = ({ children }) => (
  <div className="tile is-parent is-4 is-vertical show">
      {children}
    </div>
  );
  
export function ListItem({ children }) {
    return <div>{children}</div>;
}

export default List;