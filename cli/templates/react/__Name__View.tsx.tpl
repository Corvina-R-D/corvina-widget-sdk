import { useState } from "react";

export interface __Name__ViewProps {
  message: string;
  value: number;
  clicksLabel: string;
}

/* The React component of the widget: it receives the widget properties as props */
export default function __Name__View( { message, value, clicksLabel }: __Name__ViewProps ) {
  // State of the view, kept by React: no requestUpdate() is needed
  const [ clicks, setClicks ] = useState( 0 );
  const percent = Math.min( Math.max( value, 0 ), 100 );

  return (
    <div className="__cssClass__">
      <h2>{ message }: { value }</h2>
      <div className="bar"><div className="bar-fill" style={ { width: `${percent}%` } } /></div>
      <button onClick={ () => setClicks( c => c + 1 ) }>{ clicksLabel }: { clicks }</button>
    </div>
  );
}
