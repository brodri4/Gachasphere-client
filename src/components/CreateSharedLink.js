import React, { useEffect, useState, useRef } from "react";

function CreateSharedLink(props) {
  return (
    <div>
      {props.sharedLink ? (
        <div className="create-share-link">
          <h4>Share Link</h4>
          <p>http://gachasphere.surge.sh/#/list/{props.listId}</p>
        </div>
      ) : null}
    </div>
  );
}

export default CreateSharedLink;
