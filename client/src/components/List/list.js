import React from "react";

// LIST AND LIST ITEM COMPONENTS

export const List = ({ children }) => (
    <ul className="list-group">
      {children}
    </ul>
  );
  
export function ListItem({ children }) {
    return <li className="list-group-item">{children}</li>;
}

export default List;