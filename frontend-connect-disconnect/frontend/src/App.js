import logo from "./logo.svg";
import "./App.css";
import { HocuspocusProvider } from "@hocuspocus/provider";
//import { Button, H4, Instance, Title } from "./Components.tsx";
import {
  withYHistory,
  withYjs,
  YjsEditor,
} from "@slate-yjs/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import * as Y from "yjs";
import { Plate, PlateProvider, TEditableProps, usePlateSelectors, usePlateStates,createTEditor,createPlateEditor } from '@udecode/plate';





const editableProps = {
  placeholder: 'Type...',
};

function App() {
  //for Plate
  const [value, setValue] = usePlateStates().value();
  const [isOnline, setOnlineState] = useState(false);
  
  //for Slate
  // const [value, setValue] = useState([])

  // const provider = useMemo(
  //   () =>
  //     new WebsocketProvider({
  //       url: 'ws://localhost:1234',
  //       //url: "ws://127.0.0.1:8080",
  //       name: "slate-yjs-demo",
  //       connect: false,
  //     }),
  //   []
  // );

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        // url: 'ws://localhost:1234',
        url: "ws://127.0.0.1:8080",
        name: "slate-yjs-demo",
        connect: false,
      }),
    []
  );

  const editor = useMemo(() => {
    const sharedType = provider.document.get("content", Y.XmlText);
    return withReact(withYHistory(withYjs(createPlateEditor(), sharedType)));
  }, [provider.document]);

  // Connect editor and provider in useEffect to comply with concurrent mode
  // requirements.
  useEffect(() => {
    provider.connect();
    return () => provider.disconnect();
  }, [provider]);
  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  // const toggleOnline = () => {
  //   isOnline ? provider.disconnect() : provider.connect();
  // };

  const toggleOnline = () => {
    provider.connect();
    
  };

  const toggleOffline = () => {
    provider.disconnect() 
  };





  return (
    //withSlate
    // <Slate value={value} onChange={setValue} editor={editor}>
    //   <Editable />
    // </Slate>

    //withPlate
    <div>
      <Plate editableProps={editableProps} onChange={setValue} value={value} editor={editor} >
      value: {JSON.stringify(value)}
    </Plate>

    <div >
          <button type="button" onClick={toggleOnline}>
            Go Online
          </button>//
          
        </div>

        <div >
          <button type="button" onClick={toggleOffline}>
            Go Offline
          </button>//
          
        </div>
    
    </div>

    
    

  );
}

export default App;
