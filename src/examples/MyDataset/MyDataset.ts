import { BaseGraphicWgt, DataValue, BaseWgt, IDataLinkConstructorArgs, Value, DataLink } from "corvina";
import { widgetType } from "./defs";

export default class MyDataset extends BaseGraphicWgt {

  private label: Value<string>;
  private source: Value<string>;
  private data: DataValue[];
  private sourceDatalink : DataLink;
  private tagName: string;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.label = new Value( args.initState.label || "Dataset 1");
    this.source = new Value("");
  }

  // Override BaseGraphicWgt::addDatalink
  public addDatalink( dataLink: IDataLinkConstructorArgs )
  {
    const newDatalink = super.addDatalink(dataLink);
    switch( dataLink.tgtProp )
    {
      case "source":
        this.sourceDatalink = newDatalink;
        this.tagName = dataLink.srcProp;
        this.refresh();
        break;
    }
    return newDatalink;
  }
  

  public async refresh(from?: number, to?: number): Promise<any>
  {
    if ( from === undefined )
        from = this.parent.getPropertyValue( "from" ).getTime();
    if ( to === undefined )
        to = this.parent.getPropertyValue( "to" ).getTime();
    this.data = await this.fetchData(from, to);
    this.parent && this.parent.update();
  }


  // Example methods to fetch historical data
  public async fetchData( from: number, to: number ): Promise<DataValue[]>
  {
    if ( !this.sourceDatalink || !this.tagName )
      return [];

    // Here and example to request 
    return await this.sourceDatalink.fetchHistoricalData({
        from,         // Start date in milliseconds
        to,           // End date in milliseconds
    });
  }

  serialize() {
    let serializedWgt = super.serialize();
    return serializedWgt;
  }
}
