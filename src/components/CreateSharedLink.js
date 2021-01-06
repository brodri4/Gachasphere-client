import React, { useEffect, useState, useRef } from "react";

function CreateSharedLink(props) {
  return (
    <div>
      {props.sharedLink ? (
        <div className="add-rating">
          <h4>Shared Link</h4>
          <p>http://gachasphere.surge.sh/#/list/{props.listId}</p>
        </div>
      ) : null}
    </div>
  );
}

export default CreateSharedLink;
