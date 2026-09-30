import { BaseWgt, BaseGraphicWgt, Value, DataValue, IDataLinkConstructorArgs } from "corvina";
import MyDataset from "../MyDataset/MyDataset";


export default class WgtWithDatasetSample extends BaseGraphicWgt
{
  private from: Value<Date>;
  private to: Value<Date>;
  private dataUpdateCallback: Function; // to resolve vue.js reactivity issue on array or object

  constructor( args )
  {
    super( args );
    this.from = args.initState.from ? new Value( new Date( args.initState.from )) : new Value(new Date());
    this.to = args.initState.from ? new Value( new Date( args.initState.to )) : new Value(new Date( Date.now() + 5000 ));
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

  // Function used to resolve a vue.js reactivity issue on array or object
  public onDataUpdate( callback: (data: {label: string, data: DataValue[]}[]) => void )
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
          let datasets: MyDataset[] = this.getPropertyValue("datasets");
          for( let dataset of datasets){
            dataset.refresh( 
              this.from.unwrap().getTime(),
              this.to.unwrap().getTime()
            );
          }
          break;
      }
  }

  // Override BaseWgt::update
  public update(): any {
    this.dataUpdateCallback &&
    this.dataUpdateCallback(
      this.getPropertyValue("data")
    );
  }

  // Override BaseGraphicWgt::getPropertyValue
  public getPropertyValue(prop: string): any
  {
    switch( prop )
    {
      case "data":
        const datasets = this.wgts.filter( wgt => wgt instanceof MyDataset );
        let data = [];
        for(let dataset of datasets)
          data.push({
            label: dataset.getPropertyValue("label"),
            data: dataset.getPropertyValue("data") || []
          });
        return data;
      case "datasets":
        return this.wgts.filter( wgt => wgt instanceof MyDataset );
      default:
        return super.getPropertyValue( prop );
    }
  }

  // Override BaseGraphicWgt::serialize
  public serialize()
  {
    let serializedWgt = super.serialize();
    serializedWgt.from = this.from.unwrap().getTime();
    serializedWgt.to = this.to.unwrap().getTime();
    return serializedWgt;
  }
}
