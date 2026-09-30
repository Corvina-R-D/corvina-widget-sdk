// Just a class to create some data
import { DataValue } from "corvina";
export default class DataSimulator
{
  public static generate( args?: any ): DataValue[]
  {
    return [
      {  ts: new Date( Date.now() + ( 60 * 1000 ) ).getTime(), v: Math.random() * 100 },
      {  ts: new Date( Date.now() + ( 2 * 60 * 1000 ) ).getTime(), v: Math.random() * 100 },
      {  ts: new Date( Date.now() + ( 3 * 60 * 1000 ) ).getTime(), v: Math.random() * 100 },
      {  ts: new Date( Date.now() + ( 4  * 60 * 1000 ) ).getTime(), v: Math.random() * 100 }
    ];
  }
}