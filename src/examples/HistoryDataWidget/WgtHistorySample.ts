import { BaseWgt, BaseGraphicWgt, Value, DataValue, IDataLinkConstructorArgs, DataLink } from "corvina";
import DataSimulator from "./DataSimulator";


export default class WgtHistorySample extends BaseGraphicWgt
{
  private tagReference: Value<string>;
  private tagName: string;
  private dataSerie: DataValue[];
  private sourceDatalink : DataLink;
  private from: Value<Date>;
  private to: Value<Date>;
  private dataUpdateCallback: Function; // to resolve vue.js reactivity issue on array or object

  constructor( args )
  {
    super( args );
    /*
     * Inside initState there is the state of the serialized widget in JSON format
     */
    this.from = args.initState.from ? new Value( new Date( args.initState.from )) : new Value(new Date());
    this.to = args.initState.from ? new Value( new Date( args.initState.to )) : new Value(new Date( Date.now() + 5000 ));
    this.tagReference = new Value( args.initState.source );
  }

  // This function is called every time a widget is dropped from gallery to dashboard
  public loadDefaultConfiguration(): void
  {
    // We load default to datalink to global DataWindow
    const dataWindow = this.getProject().getWidget( "DataWindow" );
    this.connectWidgetProperties(
      dataWindow,
      new Map( [
          ["from", { name: "startDate", permission: "read/write" } ],
          ["to", { name: "endDate", permission: "read/write" } ]
      ] )
    );
  }

  // Example methods to fetch historical data
  public async fetchData( simulateDataFetching?: boolean ): Promise<void>
  {
    if ( simulateDataFetching ) {
      this.dataSerie = await this.fetchSimulated( this.from.unwrap().getTime(), this.to.unwrap().getTime() );
    } else {
      this.dataSerie = await this.fetchReal( this.from.unwrap().getTime(), this.to.unwrap().getTime() );
    }
    this.dataUpdateCallback && this.dataUpdateCallback( this.dataSerie );
  }

  // Example methods to simulate some data
  private async fetchSimulated( from: number, to: number ): Promise<DataValue[]>
  {
    return DataSimulator.generate();
  }

  // Example methods to get historical data from cloud
  private async fetchReal( from: number, to: number ): Promise<DataValue[]>
  {
    if ( !this.sourceDatalink || !this.tagName )
      return [];

    // Here and example to request 
    const data = await this.sourceDatalink.fetchHistoricalData({
        from,         // Start date in milliseconds
        to,           // End date in milliseconds
    });
    return data;
  }

  // Function used to resolve a vue.js reactivity issue on array or object
  public onDataUpdate( callback: ( data: DataValue[] ) => void )
  {
    this.dataUpdateCallback = callback;
  }

  // Override BaseGraphicWgt::setPropertyValue
  public setPropertyValue( { prop, value } )
  {
      super.setPropertyValue( { prop, value } );
      switch ( prop )
      {
        case "from":
        case "to":
          this.fetchData();
          break;
      }
  }

  // Override BaseGraphicWgt::addDatalink
  public addDatalink( dataLink: IDataLinkConstructorArgs )
  {
    const newDatalink = super.addDatalink(dataLink);
    switch( dataLink.tgtProp )
    {
      case "tagReference":
        this.sourceDatalink = newDatalink;
        this.tagName = dataLink.srcProp;
        break;
    }
    return newDatalink;
  }

  // Override BaseGraphicWgt::serialize
  public serialize()
  {
    let serializedWgt = super.serialize();
    serializedWgt.tagReference = this.tagReference.resolve();
    serializedWgt.from = this.from.unwrap().getTime();
    serializedWgt.to = this.to.unwrap().getTime();
    serializedWgt.tagName = this.tagName;
    return serializedWgt;
  }
}
