
# Introduction

In this guide we'll dig into the main concepts of Corvina's architecture and go through the most important operations we can perform.

# Dashboard

The **Dashboard** is an entity represented by a collection of widgets. It contains a **ProjectWgt** which in turn contains the tree of all widgets in the Dashboard. It's in charge of handling the state and lifecycle of the project.

### Retrieving the current dashboard

To get access to the dashboard we need to import the **projectStore** object from the **corvina** module and call the **getDashboard** method. 

```typescript
import { projectStore } from 'corvina';

let dashboard = projectStore.getDashbboard();
```

### DeviceSlot

A Dashboard has a set of Device Slots we can define, which will determine how our dashboard interfaces with remote devices. This allows us to connect the same Dashboard to multiple devices with the same model. This  is a bit confusing I know, so let us see an example. Imagine you are a manufacturer of Smart Boilers and you are creating a Dashboard to monitor your devices. You wouldn't want to create one Dashboard for each of your boilers. What a nightmare! What you would do is simply adding a DeviceSlot which complies with your devices model. Then, you can load the same dashboard with different devices 'pointing' to that **DeviceSlot**. If we think of it in pure programming terms, we could compare the DeviceSlot to a good old static typed variable and its type to the Model of the Device. We can change the value of the variable as long as it's of the same type.

### Adding a DeviceSlot

To add a **DeviceSlot** we need to use the **addDeviceSlot** method. This willl create a **DeviceSlot** with the given name, the id of the model and **optionally**, the id of a device we can 'point to' by default.

```typescript
dashboard.addDeviceSlot('slotName', 'modelId', 'deviceId');
```

To dynamically point to another device we can use the **setSlotDevice** method, giving it the name of the slot to change and the id of the new device. All widgets reading data from the given slot will start showing the data of the new device to which it is now pointing.

```typescript
dashboard.setSlotDevice('slotName', 'deviceId');
```

### Removing a DeviceSlot

To remove the slot we call the **removeDeviceSlot** method with the name of the slot that we wish to remove.

```typescript
dashboard.removeDeviceSlot('slotName');
```

### Adding Widgets

Adding a widget to our dashboard is as simple as calling **addWidget**. We must provide the type of the widget we want to create, and the **wgtId** of the parent. This will create a new widget of the given type with default factory data, add it to the parent and initialize its subsystems.

```typescript
let newWgt = dashboard.addWidget({ type: "WidgetType", parentId: parentWgtId });
```
Optionally, we can provide the **initState** parameter in order to create a widget with initial data other than the default. To give you a better idea, this is used internally when loading a saved dashboard. The saved state of each widget is passed to the **initState** parameter.

```typescript
let newWgt = dashboard.addWidget({ 
    type: "WidgetType", 
    parentId: parentWgtId, 
    initState: { prop: "value" }
});
```

We can also perform this operation in bulk by using the  **addWidgets** method and providing the former parameters in an array.

```typescript
let newWgt = dashboard.addWidgets([
    { type: "WidgetType", parentId: parentWgtId },
    { type: "WidgetType", parentId: parentWgtId },
]);
```

### Removing Widgets

To  remove a single widget we call the **removeWidget** method

```typescript
dashboard.removeWidget(wgt.wgtId);
```

We can also remove multiple widgets by using the **removeWidgets** method

```typescript
dashboard.removeWidgets([wgtId1, wgtId2, wgtId3]);
```

# What is a Widget?

In Corvina, a widget is a data structure which performs operations and sends/receives data to/from other widgets with the help of data links. It is basically a virtual entity which does not necessarily need to have a graphic representation. As an example, we could have 'PieChartWidget' which provides the functionality and graphical representation of a pie chart. Now, in order to take advatage of their powerful functionality we could represent the datasets as Widgets. So we would have a 'PieChartWidget' with a graphic representation and the the 'DatasetWidget' which onnly feeds data to the chart. We can use a DataLink to connect each 'DatasetWidget' to live data from a device or maybe to the result of an operation by another widget within the same project. There are so many things we can do with just a little Wit and creativity.

# BaseWgt

The **BaseWgt** class defines the base data structure and functionality of a bare bones widget. This is, a widget which 'does something' but has no graphic representation. All widgets extend BaseWgt either directly or inderectly. An important aspect of a widget is it's capability to have children. The BaseWgt class provides functionality to add and remove its children as well as accessing them, but it's recommended to rely on the Dashboard functionality to perform these operations in order to avoid unnecessary hassle.

# BaseGraphicWgt

The **BaseGraphicWgt** class provides base functionality for all widgets that have a graphic representation within a Dashboard. To put it simply, if it can be seen, it's a **BaseGraphicWgt**.

# GroupWgt

A **GroupWgt** is a **BaseGraphicWgt** formed by a group of other **BaseGraphicWgt**. It also provides base functionality to present a widget's children in an orderly fashon. There are two ways to represent a group: with or without a grid layout. Without the grid layout the children of a group can be placed freely within its boundaries. The GridLayout provides functionality to represent a group's children as a grid. We can add and remove columns and rows where any **BaseGraphicWgt** can be placed.

# DataLink

A DataLink helps us connect widgets together by their properties. They can read and write data from/to a widget and can be enhanced by using formulas to provide a rich and dynamic output. Under the hood, a **DataLink** is a scheduled operation that 'watches' for changes in the property of a widget and propagates the value to the target widget. Keep in mind that, in order for a property to be observable by a DataLink it has to be of type **Value**.

### The Value class

The **Value** class is a structure which provides a placeholder for a value that a DataLink can attach to. It stores the value in the "v" property and other useful information like the timestamp ("ts" prop) and the quality of the value ("q" prop).

### Adding a DataLink

To add a **DataLink** to a widget all we need is to call **addDatalink** providing the **wgtId** of the source widget, the source property's name, the name of the property to target in the current widget (owner of the **DataLink**) and the permission ("readonly", "write", "read/write"). After that, we need to initialize it by calling the **DataLink**'s **init** method.

```typescript
let dl = widget.addDatalink({
    sourceId: "wgtId",
    srcProp: "sourcePropName",
    tgtProp: "targetPropName",
    permission: "readonly"
});

dl.init();
```

To better understand permissions lets put forward an example. Imagine two numeric widgets in a dashboard. NumWgt1 and NumWgt2. We add a DataLink to NumWgt1 with its 'value' property as target and the 'value' property of NumWgt2 as source. In the case of "readonly" the **DataLink** will watch NumWgt2.value and propagate the changes to NumWgt1.value. In the case of "read/write" the **DataLink** will watch both NumWgt1.value and NumWgt2.value and will propagate changes both ways. In the case of "write", the **DataLink** will only watch NumWgt1.value and propagates the changes to NumWgt2.value.

### Removing a DataLink

To remove a **DataLink** from a widget, we need to call the **BaseWgt** method, **removeDatalink**.

```typescript
widget.removeDatalink(datalink);
```

# TagMgr

So far we've seen how to connect widgets together, but what about the data sent to the cloud by our devices? That's where the Tag Manger (**TagMgr**) comes in. It is our door to the outside world. With its help we can read live data from our devices. It will handle the websocket connections under the hood so that we don't have to care about them.

### Tags

A **Tag** contains the refference to a value in a remote device. The **TagMgr** contains a list of our tags, to which we can connect.

### Adding Tags

We can add tags to the **TagMgr** by calling the **addTag** method, passing it the name of the tag. The name of a tag could either be an exact address to a property in the device model ('device/property') or the address to a property in the model of a **DeviceSlot** ('SlotName/property'). Either way, it has to be a valid address.

```typescript
tagMgr.addTag( tagName )
```

### Removing Tags

To remove a tag, we call **removeTag** and give it the name of the tag to remove.

```typescript
tagMgr.removeTag( tagName )
```

### Connecting widgets to the outside world

So much about creating tags and connecting the Tag Manager to the outside world, but what about connecting any widget? Well, remmember the **TagMrg** is a **BaseWgt** and as such we can connect to it's  properties  using a **DataLink**.

```typescript
wgt.addDatalink({
    sourceId: "TagMgr",
    srcProp: tagName,
    tgtProp: prop,
    permission: "readonly"
});
```

# PageWgt

The **PageWgt** is where we place our widgets. They sit directly under the **ProjectWgt**. They define the fisical boundaries of our project and thus the position and dimension of all widgets within it. By default,  in Corvina we don't place widgets directly on the page, but on a **GroupWgt** with **GridLayout** which covers the entirety of its dimension. This is, to make it easy for a given user to add widgets to the scene  by dragging and dropping files over a grid.

# ProjectWgt

The **ProjectWgt** is the root of our dashboard's Hierarchy. Its first child is the **TagMgr** and the rest of its children are the pages (**PageWgt**) in the project.

### Base Hierarchy

- **ProjectWgt**
    - **TagMgr**
    - **PageWgt**
        - **GroupWgt**

